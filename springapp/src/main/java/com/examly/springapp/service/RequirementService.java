package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.Requirement;

public interface RequirementService {
  Requirement addRequirement(Requirement requirement);
  Requirement getRequirementById(Long requirementId);
  List<Requirement> getAllRequirements();
  Requirement updateRequirement(Long requirementId,Requirement requirement);
  boolean deleteRequirement(Long requirementId);
  List<Requirement> getRequirementByTrainerId(Long trainerId);
  Requirement assignRequiremtToTrainer(Long requirementId,Long trainerId);

}
