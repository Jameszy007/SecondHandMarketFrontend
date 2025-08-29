const KEY = "user_transactions";

// Load transactions from localStorage
export function loadTransactions() {
  try {
    const transactions = localStorage.getItem(KEY);
    return transactions ? JSON.parse(transactions) : [];
  } catch (error) {
    console.error("Error loading transactions:", error);
    return [];
  }
}

// Save transactions to localStorage
export function saveTransactions(transactions) {
  try {
    localStorage.setItem(KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error("Error saving transactions:", error);
  }
}

// Add a new transaction
export function addTransaction(transaction) {
  const transactions = loadTransactions();
  const newTransaction = {
    ...transaction,
    id: Date.now(), // Simple ID generation
    createdAt: new Date().toISOString(),
    status: "completed"
  };
  transactions.unshift(newTransaction); // Add to beginning of array
  saveTransactions(transactions);
  return newTransaction;
}

// Get transactions for a specific user
export function getUserTransactions(userId) {
  const transactions = loadTransactions();
  return transactions.filter(transaction => transaction.userId === userId);
}

// Update transaction status
export function updateTransactionStatus(transactionId, status) {
  const transactions = loadTransactions();
  const updatedTransactions = transactions.map(transaction => 
    transaction.id === transactionId ? { ...transaction, status } : transaction
  );
  saveTransactions(updatedTransactions);
}

// Clear all transactions (for testing)
export function clearTransactions() {
  localStorage.removeItem(KEY);
}
