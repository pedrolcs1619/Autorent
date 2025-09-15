from django.db import models
from django.contrib.auth import get_user_model
from apps.veiculos.models import Veiculo

User = get_user_model()


class Locacao(models.Model):
    STATUS_CHOICES = [
        ('PENDENTE', 'Pendente'),
        ('CONFIRMADA', 'Confirmada'),
        ('ATIVA', 'Ativa'),
        ('FINALIZADA', 'Finalizada'),
        ('CANCELADA', 'Cancelada'),
    ]
    
    STATUS_PAGAMENTO_CHOICES = [
        ('PENDENTE', 'Pendente'),
        ('PAGO', 'Pago'),
        ('FALHOU', 'Falhou'),
        ('REEMBOLSADO', 'Reembolsado'),
    ]
    
    # Relacionamentos
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='locacoes')
    veiculo = models.ForeignKey(Veiculo, on_delete=models.CASCADE, related_name='locacoes')
    
    # Datas
    data_inicio = models.DateTimeField()
    data_fim = models.DateTimeField()
    data_devolucao_real = models.DateTimeField(null=True, blank=True)
    
    # Valores
    tarifa_diaria = models.DecimalField(max_digits=8, decimal_places=2)  # Valor congelado
    total_dias = models.IntegerField()
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    extras = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    valor_total = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Status
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='PENDENTE')
    status_pagamento = models.CharField(max_length=15, choices=STATUS_PAGAMENTO_CHOICES, default='PENDENTE')
    
    # Informações adicionais
    local_retirada = models.CharField(max_length=100)
    local_devolucao = models.CharField(max_length=100)
    observacoes = models.TextField(blank=True)
    
    # Controle de quilometragem
    km_inicial = models.IntegerField(null=True, blank=True)
    km_final = models.IntegerField(null=True, blank=True)
    
    # Timestamps
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Locação #{self.id} - {self.usuario.first_name} - {self.veiculo}"
    
    def save(self, *args, **kwargs):
        # Calcula automaticamente os valores
        if self.data_inicio and self.data_fim:
            delta = self.data_fim.date() - self.data_inicio.date()
            self.total_dias = max(1, delta.days)
            self.subtotal = self.tarifa_diaria * self.total_dias
            self.valor_total = self.subtotal + self.extras
        super().save(*args, **kwargs)
    
    class Meta:
        ordering = ['-criado_em']


class Pagamento(models.Model):
    METODO_PAGAMENTO_CHOICES = [
        ('CARTAO_CREDITO', 'Cartão de Crédito'),
        ('CARTAO_DEBITO', 'Cartão de Débito'),
        ('PIX', 'PIX'),
        ('TRANSFERENCIA', 'Transferência'),
        ('DINHEIRO', 'Dinheiro'),
    ]
    
    locacao = models.ForeignKey(Locacao, on_delete=models.CASCADE, related_name='pagamentos')
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    metodo_pagamento = models.CharField(max_length=20, choices=METODO_PAGAMENTO_CHOICES)
    
    # Para integração com gateway de pagamento
    id_transacao = models.CharField(max_length=100, blank=True)
    resposta_gateway = models.JSONField(blank=True, null=True)
    
    sucesso = models.BooleanField(default=False)
    processado_em = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Pagamento #{self.id} - R$ {self.valor}"
