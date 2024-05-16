package lk.ijse.spring.shoeShop.service.impl.shoeshop.service;

import lk.ijse.spring.shoeshop.dto.SupplierDTO;

import java.util.List;

public interface SupplierService {
    void saveSupplier(SupplierDTO supplierDto);
    void updateSupplier(SupplierDTO supplierDto);
    void deleteSupplier(String id);
    SupplierDTO getSupplier(String id);
    List<SupplierDTO> getAllSuppliers();
    String lastId();
    List<SupplierDTO> searchSuppliersById(String idOrName);

}
