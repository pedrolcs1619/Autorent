from rest_framework import serializers
from autorent.models import CategoriaVeiculo, Reserva, PrecoDinamico, Veiculo


class CategoriaVeiculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaVeiculo
        fields = ["id", "nome", "descricao", "diaria_base"]  
        read_only_fields = ["id"]  



class VeiculoSerializer(serializers.ModelSerializer):
    categoria = serializers.PrimaryKeyRelatedField(
        queryset=CategoriaVeiculo.objects.all()
    )
    
    class Meta:
        model = Veiculo
        fields = ["id", "categoria", "marca", "modelo", "placa", "ano", "status"]
        read_only_fields = ["id"]

class ReservaSerializer(serializers.ModelSerializer):
    nome_usuario = serializers.SerializerMethodField()
    nome_veiculo = serializers.SerializerMethodField()  # novo campo

    class Meta:
        model = Reserva
        fields = [
            "id",
            "usuario",
            "nome_usuario",   # mostra nome do usuário
            "veiculo",
            "nome_veiculo",   # mostra nome do veículo
            "data_inicio",
            "data_fim",
            "status",
            "preco_total",
            "criado_em"
        ]
        read_only_fields = ["id", "usuario", "preco_total", "criado_em"]

    def get_nome_usuario(self, obj):
        return obj.usuario.get_full_name() or obj.usuario.username

    def get_nome_veiculo(self, obj):
        return f"{obj.veiculo.marca} {obj.veiculo.modelo}"


class PrecoDinamicoSerializer(serializers.ModelSerializer):
    veiculo = serializers.PrimaryKeyRelatedField(queryset=Veiculo.objects.all())

    class Meta:
        model = PrecoDinamico
        fields = ["id", "veiculo", "data", "preco"]
        read_only_fields = ["id"]
