from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    # Informações pessoais
    telefone = models.CharField(max_length=15, blank=True)
    cpf = models.CharField(max_length=14, unique=True)
    data_nascimento = models.DateField()
    endereco = models.TextField()
    
    # Documentos da CNH
    numero_cnh = models.CharField(max_length=20, unique=True)
    validade_cnh = models.DateField()
    categoria_cnh = models.CharField(max_length=5, default='B')
    
    # Controle de criação/atualização
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    class Meta:
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'
