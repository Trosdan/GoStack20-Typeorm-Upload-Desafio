// import AppError from '../errors/AppError';

import { getCustomRepository, getRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionRepository);
    const categoryRepository = getRepository(Category);

    let categoryObj = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!categoryObj) {
      categoryObj = categoryRepository.create({
        title: category,
      });
      await categoryRepository.save(categoryObj);
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id: categoryObj.id,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
