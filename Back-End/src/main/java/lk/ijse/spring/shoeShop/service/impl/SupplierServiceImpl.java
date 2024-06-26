package lk.ijse.spring.shoeShop.service.impl;

import jakarta.persistence.EntityExistsException;
import lk.ijse.spring.shoeShop.dto.SupplierDTO;
import lk.ijse.spring.shoeShop.entity.Supplier;
import lk.ijse.spring.shoeShop.repository.SupplierRepository;
import lk.ijse.spring.shoeShop.service.SupplierService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SupplierServiceImpl implements SupplierService {

    SupplierRepository supplierRepository;
    ModelMapper modelMapper;

    public SupplierServiceImpl(SupplierRepository supplierRepository, ModelMapper modelMapper) {
        this.supplierRepository = supplierRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void saveSupplier(SupplierDTO supplierDto) {
        if (!supplierRepository.existsById(supplierDto.getSupplierCode())) {
            if (!supplierRepository.existsByEmail(supplierDto.getEmail())) {
                if (!supplierRepository.existsByMobileNo(supplierDto.getMobileNo())) {
                    if (!supplierRepository.existsByLandNo(supplierDto.getLandNo())) {
                        Supplier supplier = modelMapper.map(supplierDto, Supplier.class);
                        supplier.setAddress(supplierDto.getAddress());
                        supplierRepository.save(supplier);
                    } else {
                        throw new DuplicateKeyException("Land Number already exists");
                    }

                } else {
                    throw new DuplicateKeyException("Mobile Number already exists");
                }

            } else {
                throw new DuplicateKeyException("Email already exists");
            }
        } else {
            throw new DuplicateKeyException("Supplier already exists");

        }
    }

    @Override
    public void updateSupplier(SupplierDTO supplierDto) {
        if (supplierRepository.existsById(supplierDto.getSupplierCode())) {
            supplierRepository.save(modelMapper.map(supplierDto, Supplier.class));
        } else {
            throw new EntityExistsException("Supplier Not Found!");
        }
    }

    @Override
    public void deleteSupplier(String id) {
        if (supplierRepository.existsById(id)) {
            supplierRepository.deleteById(id);
        } else {
            throw new EntityExistsException("Supplier Not Found!");
        }
    }

    @Override
    public SupplierDTO getSupplier(String id) {
        System.out.println("supplier id :"+id);
        return modelMapper.map(supplierRepository.findById(id).get(), SupplierDTO.class);

    }

    @Override
    public List<SupplierDTO> getAllSuppliers() {
        return modelMapper.map(supplierRepository.findAll(), new TypeToken<List<SupplierDTO>>() {
        }.getType());
    }

    @Override
    public String lastId() {
        return supplierRepository.getLastIndex();
    }

    @Override
    public List<SupplierDTO> searchSuppliersById(String idOrName) {
        return modelMapper.map(supplierRepository.findBySupplierCodeStartingWithOrSupplierNameStartingWith(idOrName,idOrName),new TypeToken<List<SupplierDTO>>() {}.getType());

    }
}
