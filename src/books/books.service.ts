import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const { isbn } = createBookDto;
    // 🚀 Cek apakah ISBN sudah ada di database
    const existingBook = await this.bookRepository.findOne({ where: { isbn } });
    if (existingBook) {
      throw new ConflictException(
        'ISBN sudah digunakan, harap gunakan ISBN lain.',
      );
    }

    const newBook = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(newBook);
  }

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  findOne(id: string) {
    return this.bookRepository.findOne({ where: { id } });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('Buku tidak ditemukan');
    }

    // 🚀 Cek ISBN unik jika di-update
    if (updateBookDto.isbn) {
      const existingBook = await this.bookRepository.findOne({
        where: { isbn: updateBookDto.isbn },
      });
      if (existingBook && existingBook.id !== id) {
        throw new ConflictException('ISBN sudah digunakan oleh buku lain');
      }
    }

    // 🔄 Update data yang dikirim saja
    Object.assign(book, updateBookDto);
    book.updatedAt = new Date(); // ✅ Update timestamp

    return this.bookRepository.save(book);
  }

  async remove(id: string) {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('Buku tidak ditemukan');
    }
    await this.bookRepository.remove(book);
    return { message: 'Buku berhasil dihapus', title: book.title };
  }
}
