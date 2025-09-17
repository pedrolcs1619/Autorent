from rest_framework import viewsets, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenRefreshView
from ...utils import calcular_preco_total_reserva
from rest_framework import status




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
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        veiculo = serializer.validated_data["veiculo"]
        data_inicio = serializer.validated_data["data_inicio"]
        data_fim = serializer.validated_data["data_fim"]
        preco_total = calcular_preco_total_reserva(veiculo, data_inicio, data_fim)
        
        # atribui o usuário logado e o preço total
        serializer.save(usuario=self.request.user, preco_total=preco_total)
    
    def create(self, request, *args, **kwargs):
        veiculo_id = request.data.get("veiculo")
        data_inicio = request.data.get("data_inicio")
        data_fim = request.data.get("data_fim")

        # Pega o objeto veiculo
        veiculo = Veiculo.objects.get(id=veiculo_id)

        # Calcula preco_total
        preco_total = calcular_preco_total_reserva(veiculo, data_inicio, data_fim)

        # Adiciona preco_total nos dados da reserva
        data = request.data.copy()
        data["preco_total"] = preco_total
        data["usuario"] = request.user.id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        reserva = self.get_object()
        veiculo = reserva.veiculo
        data_inicio = request.data.get("data_inicio", reserva.data_inicio)
        data_fim = request.data.get("data_fim", reserva.data_fim)

        preco_total = calcular_preco_total_reserva(veiculo, data_inicio, data_fim)

        data = request.data.copy()
        data["preco_total"] = preco_total

        serializer = self.get_serializer(reserva, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

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


class CookieTokenObtainPairViewSet(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        data = response.data

        # Pega os tokens
        refresh = data.get("refresh")
        access = data.get("access")

        # Coloca no cookie
        response.set_cookie(
            key="access_token",
            value=access,
            httponly=True,
            secure=False,  # em produção: True
            samesite="Lax",
        )
        response.set_cookie(
            key="refresh_token",
            value=refresh,
            httponly=True,
            secure=False,
            samesite="Lax",
        )

        return response
    

class LogoutViewSet(APIView):
    def post(self, request):
        response = Response({"detail": "Logout realizado com sucesso."})
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return response
    
class CookieTokenRefreshViewSet(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        data = response.data

        new_access = data.get("access")
        if new_access:
            response.set_cookie(
                key="access_token",
                value=new_access,
                httponly=True,
                secure=False,
                samesite="Lax",
            )

        return response