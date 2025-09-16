from rest_framework import viewsets, permissions

from autorent.models import CategoriaVeiculo
from autorent.models import Veiculo
from autorent.models import Reserva
from autorent.models import PrecoDinamico

from .serializers import ReservaSerializer
from .serializers import VeiculoSerializer
from .serializers import PrecoDinamicoSerializer
from .serializers import CategoriaVeiculoSerializer


class CategoriaVeiculoViewSet(viewsets.ModelViewSet):
    queryset = CategoriaVeiculo.objects.all()
    serializer_class = CategoriaVeiculoSerializer
    permission_classes = [permissions.IsAuthenticated]


class ReservaViewSet(viewsets.ModelViewSet):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]  # só usuários logados podem acessar


class VeiculoViewSet(viewsets.ModelViewSet):
    queryset = Veiculo.objects.all()
    serializer_class = VeiculoSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]  


class PrecoDinamicoViewSet(viewsets.ModelViewSet):
    queryset = PrecoDinamico.objects.all()
    serializer_class = PrecoDinamicoSerializer
    permission_classes = [permissions.IsAuthenticated]