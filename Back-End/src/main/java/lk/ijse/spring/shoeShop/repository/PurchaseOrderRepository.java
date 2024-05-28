package lk.ijse.spring.shoeShop.repository;

import lk.ijse.spring.shoeShop.entity.Sales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PurchaseOrderRepository extends JpaRepository<Sales,String> {
    @Query(value = "SELECT order_no FROM Sales ORDER BY LENGTH(order_no) DESC, order_no DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();
}