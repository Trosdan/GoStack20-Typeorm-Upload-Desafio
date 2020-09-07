import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

interface Request {
  transactionId: string;
}

class DeleteTransactionService {
  public async execute({ transactionId }: Request): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const transaction = await transactionRepository.findOne({
      id: transactionId,
    });

    if (!transaction) {
      throw new AppError('Transação não encontrada', 404);
    }

    await transactionRepository.delete({ id: transactionId });
  }
}

export default DeleteTransactionService;
