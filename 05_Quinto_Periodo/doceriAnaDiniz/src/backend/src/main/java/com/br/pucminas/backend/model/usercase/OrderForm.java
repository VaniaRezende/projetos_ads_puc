package com.br.pucminas.backend.model.usercase;

import java.sql.Timestamp;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderForm {

    private String emailUser;
    private String operation;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String paymentMethod;
    private Float totalValueOrder;

    private List<OrderProductForm> itensDoPedido;

}
