import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  Min,
  Max,
  Matches,
  Length,
} from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty({ message: 'ISBN tidak boleh kosong' })
  @IsString()
  @Length(10, 13, { message: 'ISBN harus memiliki panjang 10-13 karakter' })
  @Matches(/^\d+$/, { message: 'ISBN hanya boleh berisi angka' })
  isbn: string;

  @IsNotEmpty({ message: 'Judul buku tidak boleh kosong' })
  @IsString()
  @Length(3, 255, { message: 'Judul harus antara 3-255 karakter' })
  title: string;

  @IsNotEmpty({ message: 'Penulis tidak boleh kosong' })
  @IsString()
  @Length(3, 100, { message: 'Nama penulis harus antara 3-100 karakter' })
  author: string;

  @IsOptional()
  @IsString()
  @Length(10, 1000, { message: 'Deskripsi harus antara 10-1000 karakter' })
  description?: string;

  @IsNotEmpty({ message: 'Penerbit tidak boleh kosong' })
  @IsString()
  @Length(3, 255, { message: 'Penerbit harus minimal 3 karakter' })
  publisher: string;

  @IsNotEmpty({ message: 'Tahun terbit tidak boleh kosong' })
  @IsInt({ message: 'Tahun terbit harus berupa angka' })
  @Min(1500, { message: 'Tahun terbit minimal 1500' })
  @Max(new Date().getFullYear(), {
    message: 'Tahun terbit tidak bisa di masa depan',
  })
  publishedYear: number;

  @IsNotEmpty({ message: 'Stok tidak boleh kosong' })
  @IsInt({ message: 'Stok harus berupa angka' })
  @Min(0, { message: 'Stok minimal 0' })
  stock: number;
}
