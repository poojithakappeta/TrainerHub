package com.examly.springapp.exceptions;

public class DuplicateEmailException extends RuntimeException {
    public DuplicateEmailException(String message){
        super(message);
    }

}
