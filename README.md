Backend service for Wallet system supporting
 • Setup wallet - POST /setup
 With account name a wallet of default balance: 0 is created.
 
 • Credit / Debit transactions - POST /transact/:walletId
 This API is to credit/debit the requested amount to/from the wallet
 
 • Fetching transactions on wallet - GET /transactions?walletId={walletId}&skip={skip}&limit={limit}
 All transactions associated with the provided wallet Id in query params will be sent as a response
 
 • Get wallet details - GET /wallet/:id
 All details associated with the provided wallet Id in query params will be sent as a response
 
 
 For more information on APIs please check the specs folder attached in the root.
 
 • User Interface for the application can be viewed at : https://wallet-system.netlify.app/
 
 • To connect via Postman, OpenAPI spec file can be imported and the baseURL is to connect is : https://wallet-system.up.railway.app/api
