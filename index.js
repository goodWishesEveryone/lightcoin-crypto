// // Every account holder of this app will have a balance that they can withdraw from and deposit to. For now, the user starts with a balance of 500.00 and there is a Withdrawal object that allows a user to withdraw money from that balance.

// let balance = 500.00;

// // class Withdrawal {

// //   constructor(amount) {
// //     this.amount = amount;
// //   }

// //   commit() {
// //     balance -= this.amount;
// //   }

// // }

// // DRIVER CODE BELOW
// // We use the code below to "drive" the application logic above and make sure it's working as expected

// // t1 = new Withdrawal(50.25);
// // t1.commit();
// // console.log('Transaction 1:', t1);

// // t2 = new Withdrawal(9.99);
// // t2.commit();
// // console.log('Transaction 2:', t2);

// // console.log('Balance:', balance);

// //To withdraw money, the application logic requires that a new instance of a Withdrawal object be created with the desired amount. The commit method should then be called in order to finalize and apply that transaction to the account's balance.

// //Run the app using npm start.

// // You should get the following output:
// // Transaction 1: Withdrawal { amount: 50.25 }
// // Transaction 2: Withdrawal { amount: 9.99 }
// // Balance: 439.76


// //=======================================================
// // Create a Deposit class to represent deposits
// // Add in the following code below or above the Withdrawal class:

// // class Deposit {

// //   constructor(amount) {
// //     this.amount = amount;
// //   }

// //   commit() {
// //     balance += this.amount;
// //   }

// // }
// // This new class works in the exact same way as the Withdrawal class except that it adds to the balance instead of taking away.
// // Let's instantiate a deposit to test it out.

// // t3 = new Deposit(120.00);
// // t3.commit();
// // console.log('Transaction 3:', t3);


// // ===================================
// // Accountclass
// // So far we have an object for Withdrawal and an object for Deposit, but the user's balance is just a number variable accessible to all functions. This is bad for a few reasons:

// // Associating data with the balance, like an account number or name, will be difficult.
// // There is just one balance amount, so the app does not support multiple accounts.
// // The variable's scope makes it accessible by any class or function in this file. Not only is this needless exposure, it could lead to a function accidentally modifying this variable.
// // To fix these issues, we are going to create an Account class that will keep track of the user and their balance.

// // class Account {

// //   constructor(username) {
// //     this.username = username;
// //     // Have the account balance start at $0 since that makes more sense.
// //     this.balance = 0;
// //   }
// // }

// // Now we can create a new account for every user of the app.
// // Add the following account creation code to the top of your driver code

// //let myAccount = new Account("snow-patrol");

// // Update the Withdrawal and Deposit classes to use this new account object instead of the balance variable.

// // class Deposit {

// //   // Pass in the account that the deposit this for
// //   constructor(amount, account) {
// //     this.amount = amount;
// //     this.account = account;
// //   }

// //   // Update the balance in the account
// //   commit() {
// //     this.account.balance += this.amount;
// //   }

// // }

// // class Withdrawal {

// //   // Pass in the account that the withdrawal this for
// //   constructor(amount, account) {
// //     this.amount = amount;
// //     this.account = account;
// //   }

// //   // Update the balance in the account
// //   commit() {
// //     this.account.balance -= this.amount;
// //   }
// // }

// // Modify your driver code to pass the correct information into the constructors

// // Each time a withdrawal or deposit is created, pass it the account that is associated with the transaction.

// // t1 = new Withdrawal(50.25, myAccount);
// // t1.commit();

// // Here we are passing the myAccount object reference to the withdrawal object when we create it. This process of passing an object the information it needs when we create it is a great design pattern. It means that, unlike before, the Withdrawal and Deposit objects are not dependent on any surrounding data in their global or outer scope. Additionally, transactions are no longer tied to only a single account. We can have these transaction records work with any account.

// // This pattern is called Dependency Injection. It's a fancy word that simply means "passing an object the things it needs rather than having the object access them itself". It makes for code that is much more modular and testable.

// // You'll also need to update the driver code to use the account balance instead of the old balance variable.

// // Transaction
// // You may have noticed that our Withdrawal and Deposit classes are starting to look very similar. So similar in fact, that when we changed from using a balance variable to an Account object, we had to make the exact same changes to both classes.

// // This smells a bit, doesn't it? In this case, it's the smell of code that isn't DRY. Is it a sign that we might benefit from inheritance by creating a superclass for these two transaction types?

// // Introduce a Transaction class to share some common code between the two classes.

// // Let's create a new class called Transaction and have Withdrawal and Deposit subclass from it. We will move all duplicate code to the Transaction class and have Withdrawal and Deposit only implement the logic that is unique to them.

// // class Transaction {

// //   constructor(amount, account) {
// //     this.amount  = amount;
// //     this.account = account;
// //   }

// // }

// class Deposit extends Transaction {
//   get value(){
//     return this.amount;
//   }

//   commit() {
//     this.account.balance += this.amount;
//   }

// }

// class Withdrawal extends Transaction {
//   get value(){
//     return -this.amount
//   }
//   commit() {
//     this.account.balance -= this.amount;
//   }
// }


// // We are moving as much logic as makes sense into the Transaction class. We want Deposit and Withdrawal to only contain the code that it absolutely has to. The remaining code in the subclasses is logic that could not be shared with the others.

// // The way we create a new Withdrawal or Deposit has not changed; the interface has stayed the same. What has changed is how we're implementing these classes. Our driver code, which uses the classes, has zero need to change. This is an example of good refactoring.

// // Refactor commit
// // Use a getter method to DRY up commit logic.

// // Instead of having commit defined in each subclass, define a getter method called value in each subclass. For deposits, the value getter should simply return this.amount. However for withdrawals, it should return the negative amount.

// // Update the commit methods to use this.value instead of this.amount.

// // Now that value contains a positive or negative amount, we can simply add value instead of having to decide in the commit. It's therefore possible to now share the commit method by moving it into the superclass.

// // Test your refactoring by writing appropriate driver code.

// // We suggest not looking at the code in the section below when practicing this. If you're stuck however, use it as a crutch.

// // Solution (Spoiler Alert!)

// // We've made our code quite object-oriented now. At this point, it should look something like this:

// // Driver CODE BELOW


// let myAccount = new Account('billybob');

// console.log('Starting Balance:', myAccount.balance);

// const t1 = new Deposit(120.00, myAccount);
// t1.commit();

// const t2 = new Withdrawal(50.00, myAccount);
// t2.commit();

// console.log('Ending Balance:', myAccount.balance);

// // Problem
// // Finishing the Features
// // The app runs, but looking at our original features list, we're still missing some logic. For these next features, we'll help you only partially. It's going to be up to you to implement most of the remaining logic.

// // If you're running short on time, consider the next set of features stretch and come back to them later.

// // Missing Feature 1 - Keep Track of Transactions
// // Right now we keep updating a balance property and we're not keeping track of each transaction that modifies the balance. It would be much better if we kept track of everything so we could have a history of every transaction for each account.

// // Let's modify the Account class to be able to keep track of the transactions.

// class Account {

//   constructor(username) {
//     this.username = username;
//     this.transactions = [];
//   }

//   get balance() {
//     // Calculate the balance using the transaction objects.
//   }

//   addTransaction(transaction) {
//     this.transactions.push(transaction);
//   }

// }
// // And we'll update the Transaction's commit method:

// class Transaction {
//  // ...
//   commit() {
//     // Keep track of the time of the transaction
//     this.time = new Date();
//     // Add the transaction to the account
//     this.account.addTransaction(this);
//   }
// }
// Now the transaction object will add itself to the account's transactions.

// Be sure to run your code and make sure it still works!

// Instruction
// Notice that the Account's balance method is blank. Calculate this value by summing up the value of every transaction.

// Missing Feature 2 - Validate Withdrawals
// There is currently nothing checking if the user has money in their account prior to allowing a withdrawal. If the user has $0 and they want to keep withdrawing from their account, there is nothing stopping them. Add some logic to make sure the user can never withdraw more money than they have.

// Tip: One way to do this is to add a check that the transaction is allowed in the Transaction's commit method. The check should call a method like isAllowed() which returns true/false and would need to be implemented in each of the two subclasses. commit should return true/false based on its success. If it's not successful, the transaction should not be added into the account either.

// Remember to test your code with some additional driver code that tests this validation

// Solution (Spoiler Alert!)
// Open the solution to compare and review your solution.

// Your final implementation should look something like this:

// https://codepen.io/anon/pen/ypLOrX?editors=0011

///*
class Account {

  constructor() {
    this.transactions = [];
  }

  get balance() {
  	let balance = 0;
    for (let t of this.transactions) {
    	balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
  	this.transactions.push(transaction);
  }
}

// abstract class
class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    // note how it has access to this.account b/c of parent
    return (this.account.balance - this.amount >= 0);
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    // deposits always allowed thanks to capitalism.
    return true;
  }
}

// DRIVER CODE (yes, keep everything in one file for now... b/c cog load)
const myAccount = new Account();

console.log('Starting Account Balance: ', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const t3 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t3.commit());

console.log('Ending Account Balance: ', myAccount.balance);
console.log("Lookings like I'm broke again");

console.log('Account Transaction History: ', myAccount.transactions);
//*/
