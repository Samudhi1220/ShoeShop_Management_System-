package lk.ijse.spring.shoeShop.service;

import lk.ijse.spring.shoeShop.dto.InventoryDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface InventoryService {

    void saveInventory(InventoryDTO inventoryDTO);
    InventoryDTO checkStatus(InventoryDTO inventoryDTO);
    String checkSupplier(InventoryDTO inventoryDTO);

    void updateInventory(InventoryDTO inventoryDTO);

    void deleteInventory(String id);

    List<InventoryDTO> getAllInventory();

    InventoryDTO getInventory(String id);

}
