from django.contrib import admin
from .models import CategoriaVeiculo, Veiculo, Reserva, PrecoDinamico

@admin.register(CategoriaVeiculo)
class CategoriaVeiculoAdmin(admin.ModelAdmin):
    list_display = ("id", "nome", "diaria_base")

@admin.register(Veiculo)
class VeiculoAdmin(admin.ModelAdmin):
    list_display = ("id", "marca", "modelo", "placa", "status", "categoria")

@admin.register(Reserva)
class ReservaAdmin(admin.ModelAdmin):
    list_display = ("id", "usuario", "veiculo", "data_inicio", "data_fim", "status", "preco_total", "criado_em")
    readonly_fields = ("preco_total", "criado_em")  # opcional, para não editar manualmente

@admin.register(PrecoDinamico)
class PrecoDinamicoAdmin(admin.ModelAdmin):
    list_display = ("id", "veiculo", "data", "preco")
