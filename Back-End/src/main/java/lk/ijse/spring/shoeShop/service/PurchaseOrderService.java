package lk.ijse.spring.shoeShop.service;

import lk.ijse.spring.shoeShop.dto.SaleDTO;

import java.util.ArrayList;
import java.util.List;

public interface PurchaseOrderService {
    String lastId();
    public void purchaseOrder(SaleDTO saleDTO);

    List<SaleDTO> getAllSales();
}