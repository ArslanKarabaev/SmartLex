package com.example.SmartLex.Controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/uploads")
public class FileController {

    @GetMapping("/{folder}/{filename}")
    public Resource getFile(@PathVariable String folder, @PathVariable String filename) throws Exception {
        Path filePath = Paths.get("uploads", folder, filename).toAbsolutePath();
        return new UrlResource(filePath.toUri());
    }
}
