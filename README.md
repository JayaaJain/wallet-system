Backend service for Wallet system supporting

 • Setup wallet - POST /setup
 
 With account name a wallet of default balance: 0 is created.
 
 Eg: https://wallet-system.up.railway.app/api/setup
 
 No Params | Request Body:{"name": "Vitaly's Wallet", "balance": 5000000.345689} | Response: {"id":"e4dd2a4e-f1aa-4aa1-a367-4472f2f58ade","balance":5000000.345689,"name":"Vitaly's Wallet","date":"2022-11-14T07:53:21.454Z","transactionId":"e390116e-7d94-4a66-af33-7b33ae393bf0"}
 
 • Credit / Debit transactions - POST /transact/:walletId
 
 This API is to credit/debit the requested amount to/from the wallet
 
 Eg: https://wallet-system.up.railway.app/api/transact/e4dd2a4e-f1aa-4aa1-a367-4472f2f58ade
 
 Params: {walletId} | Request Body:{"description": "pay bills","amount":-50} | Response: {"balance":4999950.345689,"transactionId":"2fa76e60-a650-417a-8334-6ff336911d46"}
 
 • Fetching transactions on wallet - GET /transactions?walletId={walletId}&skip={skip}&limit={limit}
 
 All transactions associated with the provided wallet Id in query params will be sent as a response
 
 Eg: https://wallet-system.up.railway.app/api/transactions?walletId=e4dd2a4e-f1aa-4aa1-a367-4472f2f58ade&skip=1&limit=0
 
 Query params: {walletId=e4dd2a4e-f1aa-4aa1-a367-4472f2f58ade, skip=1,limit=0} | Response: [{"id":"2fa76e60-a650-417a-8334-6ff336911d46","walletId":"e4dd2a4e-f1aa-4aa1-a367-4472f2f58ade","amount":-50,"balance":4999950.345689,"description":"pay bills","type":"DEBIT","date":"2022-11-14T07:54:49.060Z"}]
 
 • Get wallet details - GET /wallet/:id
 
 All details associated with the provided wallet Id will be sent as a response
 
 Eg: https://wallet-system.up.railway.app/api/wallet/e4dd2a4e-f1aa-4aa1-a367-4472f2f58ade
 
 Params: {walletId} | Response: {"id":"e4dd2a4e-f1aa-4aa1-a367-4472f2f58ade","name":"Vitaly's Wallet","balance":4999950.345689,"date":"2022-11-14T07:53:21.454Z"}
 
 For more information on APIs please check the specs folder attached in the root.
 
 • User Interface for the application can be viewed at : https://wallet-system.netlify.app/ 
 
 • To connect via Postman, OpenAPI spec file can be imported and the baseURL is to connect is : https://wallet-system.up.railway.app/api
