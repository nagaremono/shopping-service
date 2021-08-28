import { dbConnectionLoader } from '../../loaders/dbConnectionLoader';
import { dbModelLoader } from '../../loaders/dbModelLoader';
import { Product } from '../../models/Product';
import faker from 'faker';
import { User } from '../../models/User';
import argon2 from 'argon2';
import { Transaction } from '../../models/Transaction';
import { SoldItem } from '../../models/SoldItem';

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

async function main() {
  const sequelize = await dbConnectionLoader();
  dbModelLoader(sequelize);

  await Product.destroy({ truncate: true, cascade: true });
  await SoldItem.destroy({ truncate: true, cascade: true });
  await Transaction.destroy({ truncate: true, cascade: true });
  await User.destroy({ truncate: true, cascade: true });

  const products = [];

  for (let i = 0; i < 25; i++) {
    const newProduct = await Product.create(
      {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        stock: getRandomInt(0, 10000),
        images: [faker.random.image()],
      },
      { returning: true }
    );

    products.push(newProduct);
  }

  const people: User[] = [];

  for (let j = 0; j < 5; j++) {
    const username = faker.internet.userName();
    const password = faker.internet.password();
    const email = faker.internet.email();
    console.log({ username, password, email });

    const newPerson = await User.create({
      email,
      password: await argon2.hash(password),
      username,
    });

    people.push(newPerson);
  }

  const transactions: Transaction[] = [];

  for (let k = 0; k < 10; k++) {
    const purchasedProduct = products[getRandomInt(0, products.length)];
    const customer = people[getRandomInt(0, people.length)];
    const boughtQuantity = getRandomInt(1, purchasedProduct.stock);

    try {
      const result = await sequelize.transaction(async (t) => {
        const newTransaction = await Transaction.create(
          {
            customerId: customer.id,
            transactionDate: faker.date.between('2015-01-01', '2021-01-01'),
            totalAmount: (
              parseFloat(purchasedProduct.price) * boughtQuantity
            ).toFixed(2),
            paymentStatus: 'paid',
          },
          { transaction: t }
        );

        await SoldItem.create(
          {
            transactionId: newTransaction.id,
            price: purchasedProduct.price,
            images: purchasedProduct.images,
            name: purchasedProduct.name,
            quantity: boughtQuantity,
            productId: purchasedProduct.id,
          },
          { transaction: t }
        );

        await Product.update(
          {
            stock: purchasedProduct.stock - boughtQuantity,
          },
          {
            where: { id: purchasedProduct.id },
            transaction: t,
          }
        );

        return newTransaction;
      });

      transactions.push(result);
    } catch (error) {
      console.error(error);
    }
  }
}

main().catch((error) => console.error(error));
