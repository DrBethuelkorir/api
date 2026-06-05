// create-post.dto.ts
import { IsString, IsNotEmpty, IsOptional, MinLength, MaxLength, Allow } from 'class-validator';

export class CreatePostDto {
    @IsString()
    @MinLength(3, { message: 'Title must be at least 3 characters long' })
    @MaxLength(100, { message: 'Title cannot exceed 100 characters' })
    title!: string; // Allow title to be null or undefined

    @IsString()
    @IsNotEmpty({ message: 'Content is required' })
    @MinLength(10, { message: 'Content must be at least 10 characters long' })
    @MaxLength(5000, { message: 'Content cannot exceed 5000 characters' })
    content!: string;

    
}