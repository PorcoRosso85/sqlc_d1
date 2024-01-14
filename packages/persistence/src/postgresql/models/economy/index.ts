/**
 * このファイルは、経済圏を表現するデータテーブルモデルを表現します。
 */

/**
 * ユーザー：アカウント　＝　N:N
 */
export interface User {
  id: number
  name: string
}

export interface UserHasAccount extends User {
  account: Account[]
}

/**
 * アカウント：ユーザー　＝　N:N
 * アカウント：勘定科目　＝　N:N
 */
export interface Account {
  id: number
  name: string
  balance: number
}

/**
 * 勘定科目：アカウント　＝　N:1
 * 勘定科目：取引　＝　N:N
 * Account項目を持つことでグループ情報を持つことができる
 * Transactionのammount値が、このItemエンティティに累積される
 */
export interface Reason {
  id: number
  name: string
  account: Account
  ammount: number
}

/**
 * Account.Itemで累積される
 * 履歴や残高を表現する
 */
export interface AccountHasReason extends Account {
  item: Reason[]
}

/**
 * 取引：勘定科目　＝　N:N
 * Item項目を持つことでname/reason情報を持つことができる
 */
export interface Transaction {
  id: number
  reason: Reason
  debit_credit: true | false
  ammount: number
}
