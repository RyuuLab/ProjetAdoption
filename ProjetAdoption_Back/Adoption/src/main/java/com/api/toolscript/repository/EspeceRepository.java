package com.api.toolscript.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.toolscript.models.Espece;

@Repository
public interface EspeceRepository extends JpaRepository<Espece, Long> {

}
