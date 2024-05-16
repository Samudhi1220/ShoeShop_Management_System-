package lk.ijse.spring.shoeShop.service.impl.shoeshop.embedded;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class SaleDetailPK implements Serializable {
    @Column(name = "size_id")
    private String sizeId;
    @Column(name = "item_code")
    private String itemCode;
}
