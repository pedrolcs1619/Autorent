from django.db import models

class Veiculo(models.Model):
    # Tipos de categoria
    CATEGORIA_CHOICES = [
        ('ECONOMICO', 'Econômico'),
        ('COMPACTO', 'Compacto'),
        ('SEDAN', 'Sedan'),
        ('SUV', 'SUV'),
        ('LUXO', 'Luxo'),
    ]
    
    # Status do veículo
    STATUS_CHOICES = [
        ('DISPONIVEL', 'Disponível'),
        ('ALUGADO', 'Alugado'),
        ('MANUTENCAO', 'Manutenção'),
        ('INATIVO', 'Inativo'),
    ]
    
    # Tipo de combustível
    COMBUSTIVEL_CHOICES = [
        ('GASOLINA', 'Gasolina'),
        ('ETANOL', 'Etanol'),
        ('FLEX', 'Flex'),
        ('DIESEL', 'Diesel'),
    ]
    
    # Informações básicas
    marca = models.CharField(max_length=50)
    modelo = models.CharField(max_length=50)
    ano = models.IntegerField()
    placa = models.CharField(max_length=10, unique=True)
    cor = models.CharField(max_length=30)
    
    # Classificação
    categoria = models.CharField(max_length=10, choices=CATEGORIA_CHOICES)
    tipo_combustivel = models.CharField(max_length=10, choices=COMBUSTIVEL_CHOICES)
    transmissao = models.CharField(max_length=10, choices=[
        ('MANUAL', 'Manual'),
        ('AUTOMATICO', 'Automático')
    ])
    
    # Especificações
    assentos = models.IntegerField(default=5)
    portas = models.IntegerField(default=4)
    ar_condicionado = models.BooleanField(default=True)
    
    # Preço e disponibilidade
    diaria = models.DecimalField(max_digits=8, decimal_places=2)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='DISPONIVEL')
    localizacao = models.CharField(max_length=100, default='Matriz')  # Filial
    
    # Controle
    quilometragem = models.IntegerField(default=0)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.marca} {self.modelo} ({self.placa})"
    
    class Meta:
        ordering = ['marca', 'modelo']
        verbose_name = 'Veículo'
        verbose_name_plural = 'Veículos'
