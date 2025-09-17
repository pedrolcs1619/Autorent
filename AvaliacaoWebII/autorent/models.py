from django.db import models
from django.conf import settings


# ==========================
# Categoria de veículos
# ==========================
class CategoriaVeiculo(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True)
    diaria_base = models.DecimalField(
        max_digits=10, decimal_places=2
    )  # preço base por dia

    def __str__(self):
        return self.nome


# ==========================
# Veículo
# ==========================
class Veiculo(models.Model):
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
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default=DISPONIVEL
    )

    def __str__(self):
        return f"{self.marca} {self.modelo} ({self.placa})"


# ==========================
# Reserva
# ==========================
class Reserva(models.Model):
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
    preco_total = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True
    )
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-criado_em"]  # ordena do mais recente para o mais antigo

    def __str__(self):
        return f"Reserva {self.id} - {self.veiculo} - {self.usuario}"


# ==========================
# Preço Dinâmico
# ==========================
class PrecoDinamico(models.Model):
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
