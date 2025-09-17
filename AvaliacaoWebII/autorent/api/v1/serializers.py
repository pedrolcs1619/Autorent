from rest_framework import serializers
from autorent.models import CategoriaVeiculo, Reserva, PrecoDinamico, Veiculo


class CategoriaVeiculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaVeiculo
        fields = ["id", "nome", "descricao", "diaria_base"]  # campos que serão expostos
        read_only_fields = ["id"]  # somente leitura



class VeiculoSerializer(serializers.ModelSerializer):
    categoria = serializers.SlugRelatedField(
        queryset=CategoriaVeiculo.objects.all(),  # de onde buscar a categoria
        slug_field="nome"                         # usa o campo 'nome' em vez do ID
    )
    
    class Meta:
        model = Veiculo
        fields = ["id", "categoria", "marca", "modelo", "placa", "ano", "status"]
        read_only_fields = ["id"]


class ReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = ["id", "usuario", "veiculo", "data_inicio", "data_fim", "status", "preco_total", "criado_em"]
        read_only_fields = ["id", "usuario", "preco_total", "criado_em"]


class PrecoDinamicoSerializer(serializers.ModelSerializer):
    veiculo = serializers.PrimaryKeyRelatedField(queryset=Veiculo.objects.all())
    
    class Meta:
        model = PrecoDinamico
        fields = ["id", "veiculo", "data", "preco"]
        read_only_fields = ["id"]
