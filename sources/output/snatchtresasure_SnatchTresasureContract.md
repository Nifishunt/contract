# TACT Compilation Report
Contract: SnatchTresasureContract
BOC Size: 5573 bytes

# Types
Total Types: 21

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

## RoundInfo
TLB: `_ orders:dict<uint32, ^BuyInfo{startLuckyNum:uint16,nifiNum:uint16}> sum:uint16 arrLength:uint16 sequence:uint16 finish:bool winner:uint16 awardAmount:coins startTime:uint32 endTime:uint32 = RoundInfo`
Signature: `RoundInfo{orders:dict<uint32, ^BuyInfo{startLuckyNum:uint16,nifiNum:uint16}>,sum:uint16,arrLength:uint16,sequence:uint16,finish:bool,winner:uint16,awardAmount:coins,startTime:uint32,endTime:uint32}`

## BuyInfo
TLB: `_ startLuckyNum:uint16 nifiNum:uint16 = BuyInfo`
Signature: `BuyInfo{startLuckyNum:uint16,nifiNum:uint16}`

## WinnerInfo
TLB: `_ luckyNum:uint16 = WinnerInfo`
Signature: `WinnerInfo{luckyNum:uint16}`

## SignData
TLB: `_ round:uint32 nifiAmount:uint16 orderNumber:uint32 address:address = SignData`
Signature: `SignData{round:uint32,nifiAmount:uint16,orderNumber:uint32,address:address}`

## NewRoundMsg
TLB: `new_round_msg#e340781e round:uint32 sum:uint16 startTime:uint32 endTime:uint32 awardAmount:coins = NewRoundMsg`
Signature: `NewRoundMsg{round:uint32,sum:uint16,startTime:uint32,endTime:uint32,awardAmount:coins}`

## CloseRoundMsg
TLB: `close_round_msg#600fd230 round:uint32 = CloseRoundMsg`
Signature: `CloseRoundMsg{round:uint32}`

## BuyMsg
TLB: `buy_msg#6e7208a0 round:uint32 nifiAmount:uint16 orderNumber:uint32 signature:^cell = BuyMsg`
Signature: `BuyMsg{round:uint32,nifiAmount:uint16,orderNumber:uint32,signature:^cell}`

## BuyEvent
TLB: `buy_event#a8fa17a6 round:uint32 amount:uint16 orderNumber:uint32 luckyNumberIndex:uint16 = BuyEvent`
Signature: `BuyEvent{round:uint32,amount:uint16,orderNumber:uint32,luckyNumberIndex:uint16}`

## DrawMsg
TLB: `draw_msg#021c4b88 round:uint32 = DrawMsg`
Signature: `DrawMsg{round:uint32}`

## CleanMsg
TLB: `clean_msg#d9d7cdc8 round:uint32 = CleanMsg`
Signature: `CleanMsg{round:uint32}`

## PrizeMsg
TLB: `prize_msg#a64b9539 round:uint32 txId:uint256 = PrizeMsg`
Signature: `PrizeMsg{round:uint32,txId:uint256}`

## OrderInfo
TLB: `_ orderNumber:uint32 startLuckyNum:uint16 nifiNum:uint16 = OrderInfo`
Signature: `OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16}`

## BatchSyncOrderMsg
TLB: `batch_sync_order_msg#cf613994 round:uint32 order1:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16} order2:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16} order3:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16} order4:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16} order5:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16} order6:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16} order7:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16} order8:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16} order9:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16} order10:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16} order11:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16} order12:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16} order13:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16} order14:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16} = BatchSyncOrderMsg`
Signature: `BatchSyncOrderMsg{round:uint32,order1:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16},order2:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16},order3:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16},order4:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16},order5:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16},order6:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16},order7:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16},order8:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16},order9:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16},order10:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16},order11:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16},order12:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16},order13:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16},order14:OrderInfo{orderNumber:uint32,startLuckyNum:uint16,nifiNum:uint16}}`

# Get Methods
Total Get Methods: 10

## getRoundWinner
Argument: round

## getWinnerRecord

## getRoundInfoState
Argument: key

## getPrizeTxId
Argument: round

## getPrizeRecord

## getOrderExist
Argument: round
Argument: order

## getBuyInfo
Argument: round
Argument: orderNumber

## verifySignature
Argument: round
Argument: nifiAmount
Argument: orderNumber
Argument: signature
Argument: addr

## getPubkey

## owner

# Error Codes
2: Stack underflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
9583: current round time is over1
15307: current round has already been drawn
21468: current round time is over
21474: order repetition
24491: Duplicate order ID
26794: current round is not finish yet
29710: Purchase amount exceeds the limit
48921: can not close
54750: signature verify failed
57177: over bet amount
60050: round already exist
61485: current round is finish