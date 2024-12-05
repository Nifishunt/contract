import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type RoundInfo = {
    $$type: 'RoundInfo';
    orders: Dictionary<number, BuyInfo>;
    sum: bigint;
    arrLength: bigint;
    sequence: bigint;
    finish: boolean;
    winner: bigint;
    awardAmount: bigint;
    startTime: bigint;
    endTime: bigint;
}

export function storeRoundInfo(src: RoundInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.orders, Dictionary.Keys.Uint(32), dictValueParserBuyInfo());
        b_0.storeUint(src.sum, 16);
        b_0.storeUint(src.arrLength, 16);
        b_0.storeUint(src.sequence, 16);
        b_0.storeBit(src.finish);
        b_0.storeUint(src.winner, 16);
        b_0.storeCoins(src.awardAmount);
        b_0.storeUint(src.startTime, 32);
        b_0.storeUint(src.endTime, 32);
    };
}

export function loadRoundInfo(slice: Slice) {
    let sc_0 = slice;
    let _orders = Dictionary.load(Dictionary.Keys.Uint(32), dictValueParserBuyInfo(), sc_0);
    let _sum = sc_0.loadUintBig(16);
    let _arrLength = sc_0.loadUintBig(16);
    let _sequence = sc_0.loadUintBig(16);
    let _finish = sc_0.loadBit();
    let _winner = sc_0.loadUintBig(16);
    let _awardAmount = sc_0.loadCoins();
    let _startTime = sc_0.loadUintBig(32);
    let _endTime = sc_0.loadUintBig(32);
    return { $$type: 'RoundInfo' as const, orders: _orders, sum: _sum, arrLength: _arrLength, sequence: _sequence, finish: _finish, winner: _winner, awardAmount: _awardAmount, startTime: _startTime, endTime: _endTime };
}

function loadTupleRoundInfo(source: TupleReader) {
    let _orders = Dictionary.loadDirect(Dictionary.Keys.Uint(32), dictValueParserBuyInfo(), source.readCellOpt());
    let _sum = source.readBigNumber();
    let _arrLength = source.readBigNumber();
    let _sequence = source.readBigNumber();
    let _finish = source.readBoolean();
    let _winner = source.readBigNumber();
    let _awardAmount = source.readBigNumber();
    let _startTime = source.readBigNumber();
    let _endTime = source.readBigNumber();
    return { $$type: 'RoundInfo' as const, orders: _orders, sum: _sum, arrLength: _arrLength, sequence: _sequence, finish: _finish, winner: _winner, awardAmount: _awardAmount, startTime: _startTime, endTime: _endTime };
}

function storeTupleRoundInfo(source: RoundInfo) {
    let builder = new TupleBuilder();
    builder.writeCell(source.orders.size > 0 ? beginCell().storeDictDirect(source.orders, Dictionary.Keys.Uint(32), dictValueParserBuyInfo()).endCell() : null);
    builder.writeNumber(source.sum);
    builder.writeNumber(source.arrLength);
    builder.writeNumber(source.sequence);
    builder.writeBoolean(source.finish);
    builder.writeNumber(source.winner);
    builder.writeNumber(source.awardAmount);
    builder.writeNumber(source.startTime);
    builder.writeNumber(source.endTime);
    return builder.build();
}

function dictValueParserRoundInfo(): DictionaryValue<RoundInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRoundInfo(src)).endCell());
        },
        parse: (src) => {
            return loadRoundInfo(src.loadRef().beginParse());
        }
    }
}

export type BuyInfo = {
    $$type: 'BuyInfo';
    startLuckyNum: bigint;
    nifiNum: bigint;
}

export function storeBuyInfo(src: BuyInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.startLuckyNum, 16);
        b_0.storeUint(src.nifiNum, 16);
    };
}

export function loadBuyInfo(slice: Slice) {
    let sc_0 = slice;
    let _startLuckyNum = sc_0.loadUintBig(16);
    let _nifiNum = sc_0.loadUintBig(16);
    return { $$type: 'BuyInfo' as const, startLuckyNum: _startLuckyNum, nifiNum: _nifiNum };
}

function loadTupleBuyInfo(source: TupleReader) {
    let _startLuckyNum = source.readBigNumber();
    let _nifiNum = source.readBigNumber();
    return { $$type: 'BuyInfo' as const, startLuckyNum: _startLuckyNum, nifiNum: _nifiNum };
}

function storeTupleBuyInfo(source: BuyInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.startLuckyNum);
    builder.writeNumber(source.nifiNum);
    return builder.build();
}

function dictValueParserBuyInfo(): DictionaryValue<BuyInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBuyInfo(src)).endCell());
        },
        parse: (src) => {
            return loadBuyInfo(src.loadRef().beginParse());
        }
    }
}

export type WinnerInfo = {
    $$type: 'WinnerInfo';
    luckyNum: bigint;
}

export function storeWinnerInfo(src: WinnerInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.luckyNum, 16);
    };
}

export function loadWinnerInfo(slice: Slice) {
    let sc_0 = slice;
    let _luckyNum = sc_0.loadUintBig(16);
    return { $$type: 'WinnerInfo' as const, luckyNum: _luckyNum };
}

function loadTupleWinnerInfo(source: TupleReader) {
    let _luckyNum = source.readBigNumber();
    return { $$type: 'WinnerInfo' as const, luckyNum: _luckyNum };
}

function storeTupleWinnerInfo(source: WinnerInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.luckyNum);
    return builder.build();
}

function dictValueParserWinnerInfo(): DictionaryValue<WinnerInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWinnerInfo(src)).endCell());
        },
        parse: (src) => {
            return loadWinnerInfo(src.loadRef().beginParse());
        }
    }
}

export type SignData = {
    $$type: 'SignData';
    round: bigint;
    nifiAmount: bigint;
    orderNumber: bigint;
    address: Address;
}

export function storeSignData(src: SignData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.round, 32);
        b_0.storeUint(src.nifiAmount, 16);
        b_0.storeUint(src.orderNumber, 32);
        b_0.storeAddress(src.address);
    };
}

export function loadSignData(slice: Slice) {
    let sc_0 = slice;
    let _round = sc_0.loadUintBig(32);
    let _nifiAmount = sc_0.loadUintBig(16);
    let _orderNumber = sc_0.loadUintBig(32);
    let _address = sc_0.loadAddress();
    return { $$type: 'SignData' as const, round: _round, nifiAmount: _nifiAmount, orderNumber: _orderNumber, address: _address };
}

function loadTupleSignData(source: TupleReader) {
    let _round = source.readBigNumber();
    let _nifiAmount = source.readBigNumber();
    let _orderNumber = source.readBigNumber();
    let _address = source.readAddress();
    return { $$type: 'SignData' as const, round: _round, nifiAmount: _nifiAmount, orderNumber: _orderNumber, address: _address };
}

function storeTupleSignData(source: SignData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.round);
    builder.writeNumber(source.nifiAmount);
    builder.writeNumber(source.orderNumber);
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserSignData(): DictionaryValue<SignData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSignData(src)).endCell());
        },
        parse: (src) => {
            return loadSignData(src.loadRef().beginParse());
        }
    }
}

export type NewRoundMsg = {
    $$type: 'NewRoundMsg';
    round: bigint;
    sum: bigint;
    startTime: bigint;
    endTime: bigint;
    awardAmount: bigint;
}

export function storeNewRoundMsg(src: NewRoundMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3812653086, 32);
        b_0.storeUint(src.round, 32);
        b_0.storeUint(src.sum, 16);
        b_0.storeUint(src.startTime, 32);
        b_0.storeUint(src.endTime, 32);
        b_0.storeCoins(src.awardAmount);
    };
}

export function loadNewRoundMsg(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3812653086) { throw Error('Invalid prefix'); }
    let _round = sc_0.loadUintBig(32);
    let _sum = sc_0.loadUintBig(16);
    let _startTime = sc_0.loadUintBig(32);
    let _endTime = sc_0.loadUintBig(32);
    let _awardAmount = sc_0.loadCoins();
    return { $$type: 'NewRoundMsg' as const, round: _round, sum: _sum, startTime: _startTime, endTime: _endTime, awardAmount: _awardAmount };
}

function loadTupleNewRoundMsg(source: TupleReader) {
    let _round = source.readBigNumber();
    let _sum = source.readBigNumber();
    let _startTime = source.readBigNumber();
    let _endTime = source.readBigNumber();
    let _awardAmount = source.readBigNumber();
    return { $$type: 'NewRoundMsg' as const, round: _round, sum: _sum, startTime: _startTime, endTime: _endTime, awardAmount: _awardAmount };
}

function storeTupleNewRoundMsg(source: NewRoundMsg) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.round);
    builder.writeNumber(source.sum);
    builder.writeNumber(source.startTime);
    builder.writeNumber(source.endTime);
    builder.writeNumber(source.awardAmount);
    return builder.build();
}

function dictValueParserNewRoundMsg(): DictionaryValue<NewRoundMsg> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNewRoundMsg(src)).endCell());
        },
        parse: (src) => {
            return loadNewRoundMsg(src.loadRef().beginParse());
        }
    }
}

export type CloseRoundMsg = {
    $$type: 'CloseRoundMsg';
    round: bigint;
}

export function storeCloseRoundMsg(src: CloseRoundMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1611649584, 32);
        b_0.storeUint(src.round, 32);
    };
}

export function loadCloseRoundMsg(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1611649584) { throw Error('Invalid prefix'); }
    let _round = sc_0.loadUintBig(32);
    return { $$type: 'CloseRoundMsg' as const, round: _round };
}

function loadTupleCloseRoundMsg(source: TupleReader) {
    let _round = source.readBigNumber();
    return { $$type: 'CloseRoundMsg' as const, round: _round };
}

function storeTupleCloseRoundMsg(source: CloseRoundMsg) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.round);
    return builder.build();
}

function dictValueParserCloseRoundMsg(): DictionaryValue<CloseRoundMsg> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCloseRoundMsg(src)).endCell());
        },
        parse: (src) => {
            return loadCloseRoundMsg(src.loadRef().beginParse());
        }
    }
}

export type BuyMsg = {
    $$type: 'BuyMsg';
    round: bigint;
    nifiAmount: bigint;
    orderNumber: bigint;
    signature: Cell;
}

export function storeBuyMsg(src: BuyMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1852967072, 32);
        b_0.storeUint(src.round, 32);
        b_0.storeUint(src.nifiAmount, 16);
        b_0.storeUint(src.orderNumber, 32);
        b_0.storeRef(src.signature);
    };
}

export function loadBuyMsg(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1852967072) { throw Error('Invalid prefix'); }
    let _round = sc_0.loadUintBig(32);
    let _nifiAmount = sc_0.loadUintBig(16);
    let _orderNumber = sc_0.loadUintBig(32);
    let _signature = sc_0.loadRef();
    return { $$type: 'BuyMsg' as const, round: _round, nifiAmount: _nifiAmount, orderNumber: _orderNumber, signature: _signature };
}

function loadTupleBuyMsg(source: TupleReader) {
    let _round = source.readBigNumber();
    let _nifiAmount = source.readBigNumber();
    let _orderNumber = source.readBigNumber();
    let _signature = source.readCell();
    return { $$type: 'BuyMsg' as const, round: _round, nifiAmount: _nifiAmount, orderNumber: _orderNumber, signature: _signature };
}

function storeTupleBuyMsg(source: BuyMsg) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.round);
    builder.writeNumber(source.nifiAmount);
    builder.writeNumber(source.orderNumber);
    builder.writeCell(source.signature);
    return builder.build();
}

function dictValueParserBuyMsg(): DictionaryValue<BuyMsg> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBuyMsg(src)).endCell());
        },
        parse: (src) => {
            return loadBuyMsg(src.loadRef().beginParse());
        }
    }
}

export type BuyEvent = {
    $$type: 'BuyEvent';
    round: bigint;
    amount: bigint;
    orderNumber: bigint;
    luckyNumberIndex: bigint;
}

export function storeBuyEvent(src: BuyEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2834962342, 32);
        b_0.storeUint(src.round, 32);
        b_0.storeUint(src.amount, 16);
        b_0.storeUint(src.orderNumber, 32);
        b_0.storeUint(src.luckyNumberIndex, 16);
    };
}

export function loadBuyEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2834962342) { throw Error('Invalid prefix'); }
    let _round = sc_0.loadUintBig(32);
    let _amount = sc_0.loadUintBig(16);
    let _orderNumber = sc_0.loadUintBig(32);
    let _luckyNumberIndex = sc_0.loadUintBig(16);
    return { $$type: 'BuyEvent' as const, round: _round, amount: _amount, orderNumber: _orderNumber, luckyNumberIndex: _luckyNumberIndex };
}

function loadTupleBuyEvent(source: TupleReader) {
    let _round = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _orderNumber = source.readBigNumber();
    let _luckyNumberIndex = source.readBigNumber();
    return { $$type: 'BuyEvent' as const, round: _round, amount: _amount, orderNumber: _orderNumber, luckyNumberIndex: _luckyNumberIndex };
}

function storeTupleBuyEvent(source: BuyEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.round);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.orderNumber);
    builder.writeNumber(source.luckyNumberIndex);
    return builder.build();
}

function dictValueParserBuyEvent(): DictionaryValue<BuyEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBuyEvent(src)).endCell());
        },
        parse: (src) => {
            return loadBuyEvent(src.loadRef().beginParse());
        }
    }
}

export type DrawMsg = {
    $$type: 'DrawMsg';
    round: bigint;
}

export function storeDrawMsg(src: DrawMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(35408776, 32);
        b_0.storeUint(src.round, 32);
    };
}

export function loadDrawMsg(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 35408776) { throw Error('Invalid prefix'); }
    let _round = sc_0.loadUintBig(32);
    return { $$type: 'DrawMsg' as const, round: _round };
}

function loadTupleDrawMsg(source: TupleReader) {
    let _round = source.readBigNumber();
    return { $$type: 'DrawMsg' as const, round: _round };
}

function storeTupleDrawMsg(source: DrawMsg) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.round);
    return builder.build();
}

function dictValueParserDrawMsg(): DictionaryValue<DrawMsg> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDrawMsg(src)).endCell());
        },
        parse: (src) => {
            return loadDrawMsg(src.loadRef().beginParse());
        }
    }
}

export type CleanMsg = {
    $$type: 'CleanMsg';
    round: bigint;
}

export function storeCleanMsg(src: CleanMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3654798792, 32);
        b_0.storeUint(src.round, 32);
    };
}

export function loadCleanMsg(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3654798792) { throw Error('Invalid prefix'); }
    let _round = sc_0.loadUintBig(32);
    return { $$type: 'CleanMsg' as const, round: _round };
}

function loadTupleCleanMsg(source: TupleReader) {
    let _round = source.readBigNumber();
    return { $$type: 'CleanMsg' as const, round: _round };
}

function storeTupleCleanMsg(source: CleanMsg) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.round);
    return builder.build();
}

function dictValueParserCleanMsg(): DictionaryValue<CleanMsg> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCleanMsg(src)).endCell());
        },
        parse: (src) => {
            return loadCleanMsg(src.loadRef().beginParse());
        }
    }
}

export type PrizeMsg = {
    $$type: 'PrizeMsg';
    round: bigint;
    txId: bigint;
}

export function storePrizeMsg(src: PrizeMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2789971257, 32);
        b_0.storeUint(src.round, 32);
        b_0.storeUint(src.txId, 256);
    };
}

export function loadPrizeMsg(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2789971257) { throw Error('Invalid prefix'); }
    let _round = sc_0.loadUintBig(32);
    let _txId = sc_0.loadUintBig(256);
    return { $$type: 'PrizeMsg' as const, round: _round, txId: _txId };
}

function loadTuplePrizeMsg(source: TupleReader) {
    let _round = source.readBigNumber();
    let _txId = source.readBigNumber();
    return { $$type: 'PrizeMsg' as const, round: _round, txId: _txId };
}

function storeTuplePrizeMsg(source: PrizeMsg) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.round);
    builder.writeNumber(source.txId);
    return builder.build();
}

function dictValueParserPrizeMsg(): DictionaryValue<PrizeMsg> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePrizeMsg(src)).endCell());
        },
        parse: (src) => {
            return loadPrizeMsg(src.loadRef().beginParse());
        }
    }
}

export type OrderInfo = {
    $$type: 'OrderInfo';
    orderNumber: bigint;
    startLuckyNum: bigint;
    nifiNum: bigint;
}

export function storeOrderInfo(src: OrderInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.orderNumber, 32);
        b_0.storeUint(src.startLuckyNum, 16);
        b_0.storeUint(src.nifiNum, 16);
    };
}

export function loadOrderInfo(slice: Slice) {
    let sc_0 = slice;
    let _orderNumber = sc_0.loadUintBig(32);
    let _startLuckyNum = sc_0.loadUintBig(16);
    let _nifiNum = sc_0.loadUintBig(16);
    return { $$type: 'OrderInfo' as const, orderNumber: _orderNumber, startLuckyNum: _startLuckyNum, nifiNum: _nifiNum };
}

function loadTupleOrderInfo(source: TupleReader) {
    let _orderNumber = source.readBigNumber();
    let _startLuckyNum = source.readBigNumber();
    let _nifiNum = source.readBigNumber();
    return { $$type: 'OrderInfo' as const, orderNumber: _orderNumber, startLuckyNum: _startLuckyNum, nifiNum: _nifiNum };
}

function storeTupleOrderInfo(source: OrderInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderNumber);
    builder.writeNumber(source.startLuckyNum);
    builder.writeNumber(source.nifiNum);
    return builder.build();
}

function dictValueParserOrderInfo(): DictionaryValue<OrderInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOrderInfo(src)).endCell());
        },
        parse: (src) => {
            return loadOrderInfo(src.loadRef().beginParse());
        }
    }
}

export type BatchSyncOrderMsg = {
    $$type: 'BatchSyncOrderMsg';
    round: bigint;
    order1: OrderInfo;
    order2: OrderInfo;
    order3: OrderInfo;
    order4: OrderInfo;
    order5: OrderInfo;
    order6: OrderInfo;
    order7: OrderInfo;
    order8: OrderInfo;
    order9: OrderInfo;
    order10: OrderInfo;
    order11: OrderInfo;
    order12: OrderInfo;
    order13: OrderInfo;
    order14: OrderInfo;
}

export function storeBatchSyncOrderMsg(src: BatchSyncOrderMsg) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3479255444, 32);
        b_0.storeUint(src.round, 32);
        b_0.store(storeOrderInfo(src.order1));
        b_0.store(storeOrderInfo(src.order2));
        b_0.store(storeOrderInfo(src.order3));
        b_0.store(storeOrderInfo(src.order4));
        b_0.store(storeOrderInfo(src.order5));
        b_0.store(storeOrderInfo(src.order6));
        b_0.store(storeOrderInfo(src.order7));
        b_0.store(storeOrderInfo(src.order8));
        b_0.store(storeOrderInfo(src.order9));
        b_0.store(storeOrderInfo(src.order10));
        b_0.store(storeOrderInfo(src.order11));
        b_0.store(storeOrderInfo(src.order12));
        b_0.store(storeOrderInfo(src.order13));
        b_0.store(storeOrderInfo(src.order14));
    };
}

export function loadBatchSyncOrderMsg(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3479255444) { throw Error('Invalid prefix'); }
    let _round = sc_0.loadUintBig(32);
    let _order1 = loadOrderInfo(sc_0);
    let _order2 = loadOrderInfo(sc_0);
    let _order3 = loadOrderInfo(sc_0);
    let _order4 = loadOrderInfo(sc_0);
    let _order5 = loadOrderInfo(sc_0);
    let _order6 = loadOrderInfo(sc_0);
    let _order7 = loadOrderInfo(sc_0);
    let _order8 = loadOrderInfo(sc_0);
    let _order9 = loadOrderInfo(sc_0);
    let _order10 = loadOrderInfo(sc_0);
    let _order11 = loadOrderInfo(sc_0);
    let _order12 = loadOrderInfo(sc_0);
    let _order13 = loadOrderInfo(sc_0);
    let _order14 = loadOrderInfo(sc_0);
    return { $$type: 'BatchSyncOrderMsg' as const, round: _round, order1: _order1, order2: _order2, order3: _order3, order4: _order4, order5: _order5, order6: _order6, order7: _order7, order8: _order8, order9: _order9, order10: _order10, order11: _order11, order12: _order12, order13: _order13, order14: _order14 };
}

function loadTupleBatchSyncOrderMsg(source: TupleReader) {
    let _round = source.readBigNumber();
    const _order1 = loadTupleOrderInfo(source.readTuple());
    const _order2 = loadTupleOrderInfo(source.readTuple());
    const _order3 = loadTupleOrderInfo(source.readTuple());
    const _order4 = loadTupleOrderInfo(source.readTuple());
    const _order5 = loadTupleOrderInfo(source.readTuple());
    const _order6 = loadTupleOrderInfo(source.readTuple());
    const _order7 = loadTupleOrderInfo(source.readTuple());
    const _order8 = loadTupleOrderInfo(source.readTuple());
    const _order9 = loadTupleOrderInfo(source.readTuple());
    const _order10 = loadTupleOrderInfo(source.readTuple());
    const _order11 = loadTupleOrderInfo(source.readTuple());
    const _order12 = loadTupleOrderInfo(source.readTuple());
    const _order13 = loadTupleOrderInfo(source.readTuple());
    const _order14 = loadTupleOrderInfo(source.readTuple());
    return { $$type: 'BatchSyncOrderMsg' as const, round: _round, order1: _order1, order2: _order2, order3: _order3, order4: _order4, order5: _order5, order6: _order6, order7: _order7, order8: _order8, order9: _order9, order10: _order10, order11: _order11, order12: _order12, order13: _order13, order14: _order14 };
}

function storeTupleBatchSyncOrderMsg(source: BatchSyncOrderMsg) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.round);
    builder.writeTuple(storeTupleOrderInfo(source.order1));
    builder.writeTuple(storeTupleOrderInfo(source.order2));
    builder.writeTuple(storeTupleOrderInfo(source.order3));
    builder.writeTuple(storeTupleOrderInfo(source.order4));
    builder.writeTuple(storeTupleOrderInfo(source.order5));
    builder.writeTuple(storeTupleOrderInfo(source.order6));
    builder.writeTuple(storeTupleOrderInfo(source.order7));
    builder.writeTuple(storeTupleOrderInfo(source.order8));
    builder.writeTuple(storeTupleOrderInfo(source.order9));
    builder.writeTuple(storeTupleOrderInfo(source.order10));
    builder.writeTuple(storeTupleOrderInfo(source.order11));
    builder.writeTuple(storeTupleOrderInfo(source.order12));
    builder.writeTuple(storeTupleOrderInfo(source.order13));
    builder.writeTuple(storeTupleOrderInfo(source.order14));
    return builder.build();
}

function dictValueParserBatchSyncOrderMsg(): DictionaryValue<BatchSyncOrderMsg> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBatchSyncOrderMsg(src)).endCell());
        },
        parse: (src) => {
            return loadBatchSyncOrderMsg(src.loadRef().beginParse());
        }
    }
}

 type SnatchTresasureContract_init_args = {
    $$type: 'SnatchTresasureContract_init_args';
    owner: Address;
    pub: Cell;
    msg: string;
}

function initSnatchTresasureContract_init_args(src: SnatchTresasureContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.pub);
        b_0.storeStringRefTail(src.msg);
    };
}

async function SnatchTresasureContract_init(owner: Address, pub: Cell, msg: string) {
    const __code = Cell.fromBase64('te6ccgECZAEAFbkAART/APSkE/S88sgLAQIBYgIDAvLQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVFNs88uCCyPhDAcx/AcoAVUBQRfQAWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsv/9AAByPQAyQHMye1UYAQCASA8PQTaAZIwf+BwIddJwh+VMCDXCx/eIIIQ40B4HrqOnzDTHwGCEONAeB668uCB0x/TD9Mf0x/6AFVAbBXbPH/gIIIQYA/SMLqOlTDTHwGCEGAP0jC68uCB0x8BMds8f+AgghBucgiguuMCIIIKHEuIugUGBwgE9FVE2zyCAOqSJYAgLFn0D2+hkjBt3yBukjBtjofQ2zxsGW8J4m7y9IIA6pIhgCAsgBBBM/QOb6GUAdcBMJJbbeJu8vSAIG1wcFMREEgQfhA2VSJL3BBFyFWA2zzJVCNwIG6VMFn0WzCUQTP0F+LIcAHLH28AAW+MbW+MOGMxCgTkVUDbPCSAICdZ9A9voZIwbd8gbpIwbY6H0Ns8bBlvCeIgbvLQgG8pNIIAvxlTdr3y9BBnEFcQRxA3f1UggCAJyFWA2zzJJxA3ASBulTBZ9FswlEEz9BfiyHAByx9vAAFvjG1vjIvGNsb3NlIHJvdW5kOoOGMxCQE4MNMfAYIQbnIIoLry4IHTH9MP0x/UVTBsFNs8fw0ExI6UMNMfAYIKHEuIuvLggdMfATHbPH/gIIIQpkuVObqOmDDTHwGCEKZLlTm68uCB0x/T/1lsEts8f+AgghDZ183Iuo6VMNMfAYIQ2dfNyLry4IHTHwEx2zx/4CCCEM9hOZS6ERITFAQ62zwG2zwW2zxvIgHJkyFus5YBbyJZzMnoMRA0QTA1MzUZBA6J2zwG2zwWCzUzDAAUbmV3IHJvdW5kOgI42zxvIgHJkyFus5YBbyJZzMnoMURA+EIBf23bPDU5AvT4QW8kECNfAymAICZZ9A9voZIwbd8gbpIwbY6H0Ns8bBlvCeIgbvLQgG8pggDwLSWz8vSBU9wh+CO88vQogCAtWfQPb6GSMG3fIG6SMG2a0NMP0w9ZbBJvAuJus56BJW8h+CO58vSBU+Ly8N4FERIFBBERBAMREANP4GMOA/5UbdBUbd3bPPkACtBUGgP5EIIA1d4B8vSCAN9ZU1ugUnC+8vQREKQkpIAgUxzIWQLLD8sPySwQOgEgbpUwWfRbMJRBM/QX4lFboFNgupN/VxHeBVBHAxEQA0/tgCAJyFWA2zzJJRA4ASBulTBZ9FswlEEz9BfiQzBSNQNwc1BDSzEPBJBwBshVMIIQqPoXplAFyx8Tyx/LD8sfyw/JKFBEFEMwbW3bPMhwAcsfbwABb4xtb4yNBBnb29kIGx1Y2sgb3JkZXI6g2zwB2zw6NTMQAjjbPG8iAcmTIW6zlgFvIlnMyegxRVD4QgF/bds8NTkE6lVA2zyBO8shgCAogBBBM/QOb6GUAdcBMJJbbeJu8vQkgCAnWfQPb6GSMG3fIG6SMG2Oh9DbPGwZbwniIG7y0IBvKTOBaKok8vRxJ6T4RG6X+CX4FX/4ZN4hofgRoCAQeV41EEgQOVCSgCAJyFWA2zzJKBA4AThjMRcEhBBGEDVGVts8gCBUIGiDByFulVtZ9FswmMgBzwFBM/RD4shwAcsfbwABb4xtb4yLxhd2FyZCByb3VuZDqNs8Bds8FTg1MxUEWFVA2zxSVYAg9FswyHAByx9vAAFvjG1vjIvGNsZWFuIHJvdW5kOo2zwG2zwWODUzFgP+j30w2zxXKxEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhobHAI82zxvIgHJkyFus5YBbyJZzMnoMRA1RDD4QgF/bds8NTkCPNs8byIByZMhbrOWAW8iWczJ6DEQNEEw+EIBf23bPDU5BLIgbpUwWfRbMJRBM/QX4gGAIFN2gBAhbpVbWfRbMJjIAc8BQTP0Q+LIcAHLH28AAW+MbW+Mi7ZHJhdyByb3VuZDqNs8B9s8F9s8i+LGx1Y2t5IG51bWJlcjqDUzNRgEPts8Bds8Fds8byIByZMhbrOWAW8iWczJ6DEQRRA0QTA1MzUZAQ74QgF/bds8OQH20x8BghDPYTmUuvLggdMf0x/TD9MPVSAD0x/TD9MPVSAD0x/TD9MPVSAD0x/TD9MPVSAD0x/TD9MPVSAD0x/TD9MPVSAD0x/TD9MPVSAD0x/TD9MPVSAD0x/TD9MPVSAD0x/TD9MPVSAD0x/TD9MPVSAD0x/TD9MPVSADHQFaERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zx/HgJ+4CCCEJRqmLa6jqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4IIQgZ2+mbrjAjBwOTcAgtMf0w/TD1UgA9Mf0w/TD1UgAxErAwMRKgMDEScDAxEkAwMRIQMDER4DAxEbAwMRGAMDERUDAxESAxA/EDwQORA2BK4EES8EAxEuAwIRLQIBESwBESvbPCSAIFYsWfQPb6GSMG3fIG6SMG2Oh9DbPGwZbwniIG7y0IBvKYIA8C0ls/L0cFMAVjPCAJkCETUCVzNXMzDjDVYtwgA4Yx8gALxfA4FfqymAIFY1WfQPb6GSMG3fIG6SMG2a0NMP0w9ZbBJvAuJu8vSAIBEyVjHIWQLLD8sPyRApAREyAVYzASBulTBZ9FswlEEz9BfiES8EpFYxBREyBRExBREwBRUYA/6OaFcwgV+rKIAgVjFZ9A9voZIwbd8gbpIwbZrQ0w/TD1lsEm8C4m7y9IAgES5WLchZAssPyw/JECgBES4BVi8BIG6VMFn0WzCUQTP0F+IBETABESugAqQCES8CESwRLREsBREsBQURKgUCmQIRLwJXLVctMOJWJ8IA4w9WIcIAISIjAMBXLYFfqyWAIFYrWfQPb6GSMG3fIG6SMG2a0NMP0w9ZbBJvAuJu8vSAIBEoVifIWQLLD8sPyRAlAREoAVYpASBulTBZ9FswlEEz9BfiAREtAREloAKkAhEsAhEmESoRJAIAEgIRKQJXJ1cnMAP+jmhXKoFfqyKAIFYlWfQPb6GSMG3fIG6SMG2a0NMP0w9ZbBJvAuJu8vSAIBEiViHIWQLLD8sPyQERIgFWIwEgbpUwWfRbMJRBM/QX4gERKgERH6ARI6QRIxEpESMRIBEnESARIxEeESARHpkCESMCVyFXITDiVhvCAOMPVhXCACQlJgDmVyeBX6tWIIAgVh9Z9A9voZIwbd8gbpIwbZrQ0w/TD1lsEm8C4m7y9IAgERxWG8hZAssPyw/JAhEgAgERHAFWHQEgbpUwWfRbMJRBM/QX4gERJwERGaARIKQRIBEmESARGhEkERoRIBEYER0RGBEYERoRGAASAhEdAlcbVxswBE6ZAhEXAlcVVxUw4w0vwgCXAhERAj8/MOMNKcIAlRArOTkw4w0jwgAnKCkqAOZXJIFfq1YdgCBWGVn0D2+hkjBt3yBukjBtmtDTD9MPWWwSbwLibvL0gCARFlYVyFkCyw/LD8kCER0CAREWAVYXASBulTBZ9FswlEEz9BfiAREkAREToBEdpBEdESMRHREUESERFBEdERIRGhESERIRFBESANJXIYFfq1YagCBWE1n0D2+hkjBt3yBukjBtmtDTD9MPWWwSbwLibvL0gCAREC/IWQLLD8sPyQIRGgIBERABVhEBIG6VMFn0WzCUQTP0F+IBESEBDaARGqQRGhEgERoOER4OERoMERcMEM4AxlcegV+rVheAIC1Z9A9voZIwbd8gbpIwbZrQ0w/TD1lsEm8C4m7y9IAgUanIWQLLD8sPyQIRFwJUKrAgbpUwWfRbMJRBM/QX4gERHgEHoBEXpBEXER0RFwgRGwgRFwYRFAYQaAT8jl5XG4Ffq1YUgCAnWfQPb6GSMG3fIG6SMG2a0NMP0w9ZbBJvAuJu8vSAIFFDyFkCyw/LD8kCERQCVCRQIG6VMFn0WzCUQTP0F+IRGwGgERSkERQRGhEUAhEYAhEUERECkmwz4iDCAJJfA+MNIMIAkl8D4w0gwgCSXwPjDVYWKywtLgC+VxiBX6tWEYAgJFn0D2+hkjBt3yBukjBtmtDTD9MPWWwSbwLibvL0gCABVhjIWQLLD8sPyQIREQJWEQEgbpUwWfRbMJRBM/QX4gERGAERFqAREaQREREXEREOERUOEREArlcVgV+rLoAgJFn0D2+hkjBt3yBukjBtmtDTD9MPWWwSbwLibvL0gCABVhXIWQLLD8sPySIQPwEgbpUwWfRbMJRBM/QX4gERFQERE6AOpA4RFA4LERILDgCqVxKBX6srgCAkWfQPb6GSMG3fIG6SMG2a0NMP0w9ZbBJvAuJu8vSAIAFWEshZAssPyw/JIhA8ASBulTBZ9FswlEEz9BfiARESAREQoAukCxERCxCPCwL+wgCOXD+BX6sogCAkWfQPb6GSMG3fIG6SMG2a0NMP0w9ZbBJvAuJu8vSAIBEXVhbIWQLLD8sPyRAoAREXAVKAIG6VMFn0WzCUQTP0F+IRFB+gCKQMERQMDBETDBCOEFwIlVcXVxUw4lYQwgCZAhESAlcQVxAw4w1QC6CBdA5TsS8wALA8gV+rJYAgVhRZ9A9voZIwbd8gbpIwbZrQ0w/TD1lsEm8C4m7y9IAgERFWEMhZAssPyw/JECUBEREBVhIBIG6VMFn0WzCUQTP0F+JQzqAFpBAvEJ0QW0kVBLC+8vRToLqSfzTeFxBqBQqAIAvIVYDbPMkQOEhAIG6VMFn0WzCUQTP0F+LIcAHLH28AAW+MbW+MjQYYmF0Y2ggc3luYyBvcmRlcnM6IGZyb20gg2zwG2zwWMTUzMgAwUIn0ABbLDxTLDxLLD8oAyw8B+gLLH8sfBBrbPItCB0byCNs8Ads8NTUzNADeyCHBAJiALQHLBwGjAd4hgjgyfLJzQRnTt6mqHbmOIHAgcY4UBHqpDKYwJagSoASqBwKkIcAARTDmMDOqAs8BjitvAHCOESN6qQgSb4wBpAN6qQQgwAAU5jMipQOcUwJvgaYwWMsHAqVZ5DAx4snQAjjbPG8iAcmTIW6zlgFvIlnMyegxEEX4QgF/bds8NTkBBNs8NgC6INdKIddJlyDCACLCALGOSgNvIoB/Is8xqwKhBasCUVW2CCDCAJwgqgIV1xhQM88WQBTeWW8CU0GhwgCZyAFvAlBEoaoCjhIxM8IAmdQw0CDXSiHXSZJwIOLi6F8DAuzTHwGCEIGdvpm68uCB0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwSEEYQNUZW2zwzUUXIWYIQMnsrSlADyx/LPwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJExVEQPhCAX9t2zx/ODkAEvhCUkDHBfLghAKSbW0ibrOZWyBu8tCAbyIBkTLi+EFvJBNfA/gnbxABoYIQBfXhALmOlYIQBfXhAHD7AhAkcAMEgQCCUCPbPOAQJHADBIBCUCPbPDo6AcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7ADsAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCAVg+PwIBIExNAgFIQEECTbQSpBrpMCAhd15cEQQa4WFEECCf915aETBhN15cERtniqibZ42KMGBKAgEgQkMCASBGRwIQqyvbPNs8bFFgRAIQqR3bPNs8bFFgRQACIgACIwJAqEnbPFUU2zxsUSBukjBtmSBu8tCAbyJvAuIgbpIwbd5gSAIQq6HbPNs8bFFgSQGGgCBURxNZ9A9voZIwbd8gbpIwbY6H0Ns8bBlvCeIgbvLQgG8pXwiAIFhZ9A9voZIwbd8gbpIwbZrQ0w/TD1lsEm8C4mMAAiEBNlUwEIkgCggHBgXbPPkABtBUFgP5EBBFEDRBMEsAWDHIVTBQNMsfyw/LHwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJAgFYTk8CASBZWgIVsnl2zxVBNs8bFGBgUAIBIFFSACqAICMCgwdBM/QOb6GUAdcBMJJbbeICASBTVAHdrejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOA3qTvfKost446np7wKs4ZNBOE7Lpy1Zp2W5nQdLNsozdFJBOHlzv9XzQvQWci1WhV2C2KVAWAJAqWbbPFUE2zxsUSBukjBtmSBu8tCAbyFvAeIgbpIwbd5gVQIUqu3bPFUU2zxsUWBXAsLtou37IYAgIoAQQTP0Dm+hlAHXATCSW23iIG6SW23gIG7y0ICAIFRHE1n0D2+hkjBt3yBukjBtjofQ2zxsGW8J4iBu8tCAbylfCCCAIPSHb6UgkRKVMW0ybQHikIroXwRtY1YAgiBukjBtmtDTD9MPWWwSbwLiIG7y0IBvIlMUu5SgUjC5kltw4pVbbwHbMeCAICICWfR8b6UglALUMFiVMW0ybQHiAYiAIFRHE1n0D2+hkjBt3yBukjBtjofQ2zxsGW8J4iBu8tCAbylfCIAgWFn0D2+hkjBt3yBukjBtmtDTD9MPWWwSbwLibmMAJIJwQM51aecV+dJQsB1hbiZHsgIBIFtcAkG1fRtniqCbZ42KJA3SRg2zJA3eWhAN5S3hPEQN0kYNu9BgYQICcV1eAHWybuNDVpcGZzOi8vUW1ieXVmWjZ0S0xteVN0aTRHTGlwdnA4M3ZCVnlHS2RUUEZFUXFNMlpXWEpic4IAAPovu1E0NIAAYCD6IvbPNs8bFGYF8AAiAB8O1E0NQB+GPSAAGOMvQE+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHT//QE1AHQ9AQwFRRDMGwV4Pgo1wsKgwm68uCJ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdAB1AHQQzAD0VjbPGIBOIAgJgJZ9A9voZIwbd8gbpIwbY6H0Ns8bBlvCeJjABYwbW1tA9P/MEAUAwAo9ATTD9MP0w/SANMP+gDTH9MfVYA=');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initSnatchTresasureContract_init_args({ $$type: 'SnatchTresasureContract_init_args', owner, pub, msg })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const SnatchTresasureContract_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    9583: { message: `current round time is over1` },
    15307: { message: `current round has already been drawn` },
    21468: { message: `current round time is over` },
    21474: { message: `order repetition` },
    24491: { message: `Duplicate order ID` },
    26794: { message: `current round is not finish yet` },
    29710: { message: `Purchase amount exceeds the limit` },
    48921: { message: `can not close` },
    54750: { message: `signature verify failed` },
    57177: { message: `over bet amount` },
    60050: { message: `round already exist` },
    61485: { message: `current round is finish` },
}

const SnatchTresasureContract_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RoundInfo","header":null,"fields":[{"name":"orders","type":{"kind":"dict","key":"uint","keyFormat":32,"value":"BuyInfo","valueFormat":"ref"}},{"name":"sum","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"arrLength","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"sequence","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"finish","type":{"kind":"simple","type":"bool","optional":false}},{"name":"winner","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"awardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"startTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"endTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"BuyInfo","header":null,"fields":[{"name":"startLuckyNum","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"nifiNum","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"WinnerInfo","header":null,"fields":[{"name":"luckyNum","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"SignData","header":null,"fields":[{"name":"round","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"nifiAmount","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"orderNumber","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"NewRoundMsg","header":3812653086,"fields":[{"name":"round","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"sum","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"startTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"endTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"awardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"CloseRoundMsg","header":1611649584,"fields":[{"name":"round","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"BuyMsg","header":1852967072,"fields":[{"name":"round","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"nifiAmount","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"orderNumber","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"signature","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"BuyEvent","header":2834962342,"fields":[{"name":"round","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"orderNumber","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"luckyNumberIndex","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"DrawMsg","header":35408776,"fields":[{"name":"round","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CleanMsg","header":3654798792,"fields":[{"name":"round","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"PrizeMsg","header":2789971257,"fields":[{"name":"round","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"txId","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"OrderInfo","header":null,"fields":[{"name":"orderNumber","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"startLuckyNum","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"nifiNum","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"BatchSyncOrderMsg","header":3479255444,"fields":[{"name":"round","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"order1","type":{"kind":"simple","type":"OrderInfo","optional":false}},{"name":"order2","type":{"kind":"simple","type":"OrderInfo","optional":false}},{"name":"order3","type":{"kind":"simple","type":"OrderInfo","optional":false}},{"name":"order4","type":{"kind":"simple","type":"OrderInfo","optional":false}},{"name":"order5","type":{"kind":"simple","type":"OrderInfo","optional":false}},{"name":"order6","type":{"kind":"simple","type":"OrderInfo","optional":false}},{"name":"order7","type":{"kind":"simple","type":"OrderInfo","optional":false}},{"name":"order8","type":{"kind":"simple","type":"OrderInfo","optional":false}},{"name":"order9","type":{"kind":"simple","type":"OrderInfo","optional":false}},{"name":"order10","type":{"kind":"simple","type":"OrderInfo","optional":false}},{"name":"order11","type":{"kind":"simple","type":"OrderInfo","optional":false}},{"name":"order12","type":{"kind":"simple","type":"OrderInfo","optional":false}},{"name":"order13","type":{"kind":"simple","type":"OrderInfo","optional":false}},{"name":"order14","type":{"kind":"simple","type":"OrderInfo","optional":false}}]},
]

const SnatchTresasureContract_getters: ABIGetter[] = [
    {"name":"getRoundWinner","arguments":[{"name":"round","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"WinnerInfo","optional":true}},
    {"name":"getWinnerRecord","arguments":[],"returnType":{"kind":"dict","key":"uint","keyFormat":32,"value":"uint","valueFormat":16}},
    {"name":"getRoundInfoState","arguments":[{"name":"key","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"RoundInfo","optional":true}},
    {"name":"getPrizeTxId","arguments":[{"name":"round","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"getPrizeRecord","arguments":[],"returnType":{"kind":"dict","key":"uint","keyFormat":32,"value":"uint","valueFormat":256}},
    {"name":"getOrderExist","arguments":[{"name":"round","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"order","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"bool","optional":true}},
    {"name":"getBuyInfo","arguments":[{"name":"round","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderNumber","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"BuyInfo","optional":true}},
    {"name":"verifySignature","arguments":[{"name":"round","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"nifiAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"orderNumber","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"signature","type":{"kind":"simple","type":"cell","optional":false}},{"name":"addr","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"getPubkey","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const SnatchTresasureContract_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"NewRoundMsg"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CloseRoundMsg"}},
    {"receiver":"internal","message":{"kind":"typed","type":"BuyMsg"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DrawMsg"}},
    {"receiver":"internal","message":{"kind":"typed","type":"PrizeMsg"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CleanMsg"}},
    {"receiver":"internal","message":{"kind":"typed","type":"BatchSyncOrderMsg"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
]

export class SnatchTresasureContract implements Contract {
    
    static async init(owner: Address, pub: Cell, msg: string) {
        return await SnatchTresasureContract_init(owner, pub, msg);
    }
    
    static async fromInit(owner: Address, pub: Cell, msg: string) {
        const init = await SnatchTresasureContract_init(owner, pub, msg);
        const address = contractAddress(0, init);
        return new SnatchTresasureContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new SnatchTresasureContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  SnatchTresasureContract_types,
        getters: SnatchTresasureContract_getters,
        receivers: SnatchTresasureContract_receivers,
        errors: SnatchTresasureContract_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: NewRoundMsg | CloseRoundMsg | BuyMsg | DrawMsg | PrizeMsg | CleanMsg | BatchSyncOrderMsg | Deploy | ChangeOwner) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'NewRoundMsg') {
            body = beginCell().store(storeNewRoundMsg(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CloseRoundMsg') {
            body = beginCell().store(storeCloseRoundMsg(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BuyMsg') {
            body = beginCell().store(storeBuyMsg(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DrawMsg') {
            body = beginCell().store(storeDrawMsg(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'PrizeMsg') {
            body = beginCell().store(storePrizeMsg(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CleanMsg') {
            body = beginCell().store(storeCleanMsg(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BatchSyncOrderMsg') {
            body = beginCell().store(storeBatchSyncOrderMsg(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetRoundWinner(provider: ContractProvider, round: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(round);
        let source = (await provider.get('getRoundWinner', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleWinnerInfo(result_p) : null;
        return result;
    }
    
    async getGetWinnerRecord(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getWinnerRecord', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.Uint(32), Dictionary.Values.Uint(16), source.readCellOpt());
        return result;
    }
    
    async getGetRoundInfoState(provider: ContractProvider, key: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(key);
        let source = (await provider.get('getRoundInfoState', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleRoundInfo(result_p) : null;
        return result;
    }
    
    async getGetPrizeTxId(provider: ContractProvider, round: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(round);
        let source = (await provider.get('getPrizeTxId', builder.build())).stack;
        let result = source.readBigNumberOpt();
        return result;
    }
    
    async getGetPrizeRecord(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getPrizeRecord', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.Uint(32), Dictionary.Values.BigUint(256), source.readCellOpt());
        return result;
    }
    
    async getGetOrderExist(provider: ContractProvider, round: bigint, order: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(round);
        builder.writeNumber(order);
        let source = (await provider.get('getOrderExist', builder.build())).stack;
        let result = source.readBooleanOpt();
        return result;
    }
    
    async getGetBuyInfo(provider: ContractProvider, round: bigint, orderNumber: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(round);
        builder.writeNumber(orderNumber);
        let source = (await provider.get('getBuyInfo', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleBuyInfo(result_p) : null;
        return result;
    }
    
    async getVerifySignature(provider: ContractProvider, round: bigint, nifiAmount: bigint, orderNumber: bigint, signature: Cell, addr: Address) {
        let builder = new TupleBuilder();
        builder.writeNumber(round);
        builder.writeNumber(nifiAmount);
        builder.writeNumber(orderNumber);
        builder.writeCell(signature);
        builder.writeAddress(addr);
        let source = (await provider.get('verifySignature', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
    async getGetPubkey(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getPubkey', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}