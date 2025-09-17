from django.db import models
from django.conf import settings
from django.utils import timezone



class SoftDeleteManager(models.Manager):
    def get_queryset(self):
        # Retorna apenas objetos ativos
        return super().get_queryset().filter(ativo=True)
    

# BaseModel abstrato
class BaseModel(models.Model):
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)
    ativo = models.BooleanField(default=True)
    deletado_em = models.DateTimeField(null=True, blank=True)

    objects = SoftDeleteManager()  # Manager padrão (filtra ativos)
    all_objects = models.Manager()  # Para acessar todos os registros

    class Meta:
        abstract = True

    def delete(self, using=None, keep_parents=False):
        self.ativo = False
        self.deletado_em = timezone.now()
        self.save()

# Categorias
class CategoriaVeiculo(BaseModel):
    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True)
    diaria_base = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.nome


# Veículos
class Veiculo(BaseModel):
    DISPONIVEL = "disponivel"
    ALUGADO = "alugado"
    MANUTENCAO = "manutencao"

    STATUS_CHOICES = [
        (DISPONIVEL, "Disponível"),
        (ALUGADO, "Alugado"),
        (MANUTENCAO, "Em manutenção"),
    ]

    categoria = models.ForeignKey(
        CategoriaVeiculo, on_delete=models.CASCADE, related_name="veiculos"
    )
    marca = models.CharField(max_length=100)
    modelo = models.CharField(max_length=100)
    placa = models.CharField(max_length=10, unique=True)
    ano = models.PositiveIntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=DISPONIVEL)

    def __str__(self):
        return f"{self.marca} {self.modelo} ({self.placa})"


class Reserva(BaseModel):
    PENDENTE = "pendente"
    CONFIRMADA = "confirmada"
    CANCELADA = "cancelada"
    CONCLUIDA = "concluida"

    STATUS_CHOICES = [
        (PENDENTE, "Pendente"),
        (CONFIRMADA, "Confirmada"),
        (CANCELADA, "Cancelada"),
        (CONCLUIDA, "Concluída"),
    ]

    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    veiculo = models.ForeignKey(
        Veiculo, on_delete=models.CASCADE, related_name="reservas"
    )
    data_inicio = models.DateField()
    data_fim = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=PENDENTE)
    preco_total = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    class Meta:
        ordering = ["-criado_em"]

    def save(self, *args, **kwargs):
        # Calcula preco_total se não definido
        dias = (self.data_fim - self.data_inicio).days + 1
        if self.preco_total is None:
            self.preco_total = self.veiculo.categoria.diaria_base * dias

        # Define status da reserva (por enquanto)
        if self.veiculo.status == Veiculo.ALUGADO:
            self.status = Reserva.CONFIRMADA
        elif self.veiculo.status == Veiculo.MANUTENCAO:
            self.status = Reserva.PENDENTE
        else:
            self.status = Reserva.CONFIRMADA  # aqui você quer confirmar a reserva

        super().save(*args, **kwargs)  # salva a reserva

        # **Atualiza o status do veículo baseado na reserva confirmada**
        if self.status == Reserva.CONFIRMADA:
            self.veiculo.status = Veiculo.ALUGADO
            self.veiculo.save()  # MUITO IMPORTANTE: precisa salvar o veículo




# Preço dinâmico
class PrecoDinamico(BaseModel):
    veiculo = models.ForeignKey(
        Veiculo, on_delete=models.CASCADE, related_name="precos_dinamicos"
    )
    data = models.DateField()
    preco = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        unique_together = ("veiculo", "data")
        ordering = ["data"]

    def __str__(self):
        return f"{self.veiculo} - {self.data} - R$ {self.preco}"
