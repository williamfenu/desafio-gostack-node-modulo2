import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    let newTransaction;

    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      if (balance.total < value) {
        throw Error('The outcoume is greater than the balance account');
      }
      newTransaction = this.transactionsRepository.create({
        title,
        value,
        type: 'outcome',
      });
    } else {
      newTransaction = this.transactionsRepository.create({
        title,
        value,
        type: 'income',
      });
    }

    return newTransaction;
  }
}

export default CreateTransactionService;
