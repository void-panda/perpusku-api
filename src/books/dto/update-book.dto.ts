import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  Max,
  Length,
  Matches,
} from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @Length(10, 13, { message: 'ISBN harus memiliki panjang 10-13 karakter' })
  @Matches(/^\d+$/, { message: 'ISBN hanya boleh berisi angka' })
  isbn?: string;

  @IsOptional()
  @IsString()
  @Length(3, 255, { message: 'Judul harus antara 3-255 karakter' })
  title?: string;

  @IsOptional()
  @IsString()
  @Length(3, 100, { message: 'Nama penulis harus antara 3-100 karakter' })
  author?: string;

  @IsOptional()
  @IsString()
  @Length(10, 1000, { message: 'Deskripsi harus antara 10-1000 karakter' })
  description?: string;

  @IsOptional()
  @IsString()
  @Length(3, 255, { message: 'Penerbit harus minimal 3 karakter' })
  publisher: string;

  @IsOptional()
  @IsInt({ message: 'Tahun terbit harus berupa angka' })
  @Min(1500, { message: 'Tahun terbit minimal 1500' })
  @Max(new Date().getFullYear(), {
    message: 'Tahun terbit tidak bisa di masa depan',
  })
  publishedYear?: number;

  @IsOptional()
  @IsInt({ message: 'Stok harus berupa angka' })
  @Min(0, { message: 'Stok minimal 0' })
  stock?: number;
}
