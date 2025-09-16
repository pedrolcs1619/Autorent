from rest_framework import serializers
from autorent.models import CategoriaVeiculo
from autorent.models import Reserva
from autorent.models import PrecoDinamico
from autorent.models import Veiculo


class CategoriaVeiculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaVeiculo
        fields = "__all__"
        read_only_fields = ["id"]







class VeiculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Veiculo
        fields = "__all__"
        read_only_fields = ["id"]


class ReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = "__all__"
        read_only_fields = ["id", "preco_total", "criado_em"]


class PrecoDinamicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrecoDinamico
        fields = "__all__"
