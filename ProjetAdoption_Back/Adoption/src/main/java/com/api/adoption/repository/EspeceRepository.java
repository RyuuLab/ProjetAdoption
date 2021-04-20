package com.api.adoption.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.adoption.models.Espece;

@Repository
public interface EspeceRepository extends JpaRepository<Espece, Long> {

}
