from datetime import timedelta, date

def calcular_preco_total_reserva(veiculo, data_inicio, data_fim):
    # Converte string para date se necessário
    if isinstance(data_inicio, str):
        data_inicio = date.fromisoformat(data_inicio)
    if isinstance(data_fim, str):
        data_fim = date.fromisoformat(data_fim)

    total = 0
    delta = data_fim - data_inicio

    for i in range(delta.days + 1):
        dia = data_inicio + timedelta(days=i)
        preco_dia = veiculo.precos_dinamicos.filter(data=dia).first()
        if preco_dia:
            total += preco_dia.preco
        else:
            total += veiculo.categoria.diaria_base

    return total
