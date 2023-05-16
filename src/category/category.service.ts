import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }

  async initCategory() {
    const categories = [
      {
        title: 'Thể thao',
        description: 'Cập nhật các tin tức về các môn thể thao'
      },
      {
        title: 'Tin tức Việt Nam',
        description: 'Chuyên cung cấp thông tin về Việt Nam hằng ngày'
      },
      {
        title: 'Du lịch',
        description: 'Chuyên cung cấp thông tin về du lịch'
      },
      {
        title: 'Tin tức thế giới',
        description: 'Chuyên cung cấp thông tin về Tin tức thế giới'
      },
      {
        title: 'Giải trí',
        description: 'Chuyên cung cấp thông tin về Giải trí'
      },
      {
        title: 'Khoa Học - Công Nghệ',
        description: 'Chuyên cung cấp thông tin về Khoa Học - Công Nghệ'
      },
      {
        title: 'Ẩm thực',
        description: 'Chuyên cung cấp thông tin về Ẩm thực'
      },
    ];
    const existingCategories = await Promise.all(
      categories.map(async cate => {
        const extCate = await this.categoryRepository.findOne({
          where: {
            title: cate.title,
          },
        });
        return extCate;
      })
    );

    const catesToAdd = categories.filter((cate, index) => !existingCategories[index]);

    if (catesToAdd.length === 0) {
      // Nếu không có vai trò mới cần tạo, bạn có thể trả về một giá trị tùy ý hoặc không làm gì cả
      return;
    }
    const creating = this.categoryRepository.create(catesToAdd);
    return this.categoryRepository.save(creating);
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  Search(search?: string): Promise<Category[]> {
    if (search) {
      return this.categoryRepository.find({
        where: [
          { title: Like(`%${search}%`) },
          { description: Like(`%${search}%`) },
        ],
      });
    } else {
      return this.categoryRepository.find();
    }
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id }
    });
    if (!category) {

      throw new NotFoundException(`Category ${id} not found`);
    }
    return category;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.categoryRepository.update(id, updateCategoryDto)
      .then(() => this.findOne(id));
  }

  remove(id: string): Promise<void> {
    return this.categoryRepository.delete(id).then();
  }
}
