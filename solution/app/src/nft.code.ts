
export const NftCode: { __type: 'NftCode', protocol: string, code: object[] } = {
    __type: 'NftCode',
    protocol: 'PtEdo2ZkT9oKpimTah6x2embF25oss54njMuPzkJTEi5RqfdZFA',
    code: JSON.parse(`[{"prim":"parameter","args":[{"prim":"or","args":[{"prim":"or","args":[{"prim":"pair","annots":["%balance_of"],"args":[{"prim":"list","annots":["%requests"],"args":[{"prim":"pair","args":[{"prim":"address","annots":["%owner"]},{"prim":"nat","annots":["%token_id"]}]}]},{"prim":"contract","annots":["%callback"],"args":[{"prim":"list","args":[{"prim":"pair","args":[{"prim":"pair","annots":["%request"],"args":[{"prim":"address","annots":["%owner"]},{"prim":"nat","annots":["%token_id"]}]},{"prim":"nat","annots":["%balance"]}]}]}]}]},{"prim":"pair","annots":["%mint"],"args":[{"prim":"pair","args":[{"prim":"pair","args":[{"prim":"nat"},{"prim":"bytes"}]},{"prim":"bytes"},{"prim":"bytes"}]},{"prim":"bytes"}]}]},{"prim":"or","args":[{"prim":"list","annots":["%transfer"],"args":[{"prim":"pair","args":[{"prim":"address","annots":["%from_"]},{"prim":"list","annots":["%txs"],"args":[{"prim":"pair","args":[{"prim":"address","annots":["%to_"]},{"prim":"nat","annots":["%token_id"]},{"prim":"nat","annots":["%amount"]}]}]}]}]},{"prim":"list","annots":["%update_operators"],"args":[{"prim":"or","args":[{"prim":"pair","annots":["%add_operator"],"args":[{"prim":"address","annots":["%owner"]},{"prim":"address","annots":["%operator"]},{"prim":"nat","annots":["%token_id"]}]},{"prim":"pair","annots":["%remove_operator"],"args":[{"prim":"address","annots":["%owner"]},{"prim":"address","annots":["%operator"]},{"prim":"nat","annots":["%token_id"]}]}]}]}]}]}]},{"prim":"storage","args":[{"prim":"pair","args":[{"prim":"pair","args":[{"prim":"pair","args":[{"prim":"set","annots":["%administrators"],"args":[{"prim":"address"}]},{"prim":"big_map","annots":["%ledger"],"args":[{"prim":"nat"},{"prim":"address"}]}]},{"prim":"big_map","annots":["%metadata"],"args":[{"prim":"string"},{"prim":"bytes"}]},{"prim":"big_map","annots":["%operators"],"args":[{"prim":"pair","args":[{"prim":"address"},{"prim":"address"}]},{"prim":"set","args":[{"prim":"nat"}]}]}]},{"prim":"set","annots":["%token_ids"],"args":[{"prim":"nat"}]},{"prim":"big_map","annots":["%token_metadata"],"args":[{"prim":"nat"},{"prim":"pair","args":[{"prim":"nat","annots":["%token_id"]},{"prim":"map","annots":["%token_info"],"args":[{"prim":"string"},{"prim":"bytes"}]}]}]}]}]},{"prim":"code","args":[[{"prim":"LAMBDA","args":[{"prim":"address"},{"prim":"unit"},[{"prim":"PUSH","args":[{"prim":"string"},{"string":"The sender can only manage operators for his own token"}]},{"prim":"SENDER"},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"COMPARE"},{"prim":"EQ"},{"prim":"IF","args":[[{"prim":"DROP"},{"prim":"UNIT"}],[{"prim":"FAILWITH"}]]}]]},{"prim":"LAMBDA","args":[{"prim":"pair","args":[{"prim":"big_map","args":[{"prim":"nat"},{"prim":"address"}]},{"prim":"nat"},{"prim":"address"}]},{"prim":"bool"},[{"prim":"UNPAIR","args":[{"int":"3"}]},{"prim":"SWAP"},{"prim":"GET"},{"prim":"IF_NONE","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"option is None"}]},{"prim":"FAILWITH"}],[]]},{"prim":"COMPARE"},{"prim":"EQ"}]]},{"prim":"LAMBDA","args":[{"prim":"pair","args":[{"prim":"pair","args":[{"prim":"pair","args":[{"prim":"pair","args":[{"prim":"big_map","args":[{"prim":"nat"},{"prim":"address"}]},{"prim":"big_map","args":[{"prim":"string"},{"prim":"bytes"}]}]},{"prim":"big_map","args":[{"prim":"pair","args":[{"prim":"address"},{"prim":"address"}]},{"prim":"set","args":[{"prim":"nat"}]}]},{"prim":"set","args":[{"prim":"nat"}]}]},{"prim":"big_map","args":[{"prim":"nat"},{"prim":"pair","args":[{"prim":"nat"},{"prim":"map","args":[{"prim":"string"},{"prim":"bytes"}]}]}]}]},{"prim":"nat"}]},{"prim":"unit"},[{"prim":"UNPAIR"},{"prim":"CDR"},{"prim":"SWAP"},{"prim":"GET"},{"prim":"IF_NONE","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"FA2_TOKEN_UNDEFINED"}]},{"prim":"FAILWITH"}],[{"prim":"DROP"}]]},{"prim":"UNIT"}]]},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"UNPAIR"},{"prim":"IF_LEFT","args":[[{"prim":"DIG","args":[{"int":"4"}]},{"prim":"DROP"},{"prim":"IF_LEFT","args":[[{"prim":"DUP","args":[{"int":"2"}]},{"prim":"CDR"},{"prim":"CDR"},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"CDR"},{"prim":"CAR"},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"CAR"},{"prim":"CDR"},{"prim":"CDR"},{"prim":"PAIR"},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"CAR"},{"prim":"CDR"},{"prim":"CAR"},{"prim":"DUP","args":[{"int":"5"}]},{"prim":"CAR"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"PAIR"},{"prim":"PAIR"},{"prim":"PAIR"},{"prim":"SWAP"},{"prim":"UNPAIR"},{"prim":"MAP","args":[[{"prim":"DUP"},{"prim":"UNPAIR"},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"DUP","args":[{"int":"6"}]},{"prim":"PAIR"},{"prim":"DUP","args":[{"int":"8"}]},{"prim":"SWAP"},{"prim":"EXEC"},{"prim":"DROP"},{"prim":"PUSH","args":[{"prim":"nat"},{"int":"0"}]},{"prim":"SWAP"},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"DUP","args":[{"int":"6"}]},{"prim":"CAR"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"PAIR","args":[{"int":"3"}]},{"prim":"DUP","args":[{"int":"8"}]},{"prim":"SWAP"},{"prim":"EXEC"},{"prim":"IF","args":[[{"prim":"DROP"},{"prim":"PUSH","args":[{"prim":"nat"},{"int":"1"}]}],[]]},{"prim":"SWAP"},{"prim":"PAIR"}]]},{"prim":"DIG","args":[{"int":"4"}]},{"prim":"DIG","args":[{"int":"5"}]},{"prim":"DROP","args":[{"int":"2"}]},{"prim":"SWAP"},{"prim":"PUSH","args":[{"prim":"mutez"},{"int":"0"}]},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"TRANSFER_TOKENS"},{"prim":"SWAP"},{"prim":"NIL","args":[{"prim":"operation"}]},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"CONS"},{"prim":"PAIR"},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"CAR"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"CDR"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"DUP"},{"prim":"CAR"},{"prim":"DUP"},{"prim":"CDR"},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"CDR"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"DUP"},{"prim":"CDR"},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"CDR"},{"prim":"CDR"},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"DUP"},{"prim":"CAR"},{"prim":"DUP"},{"prim":"CDR"},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"CDR"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"CAR"},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"DUP"},{"prim":"CDR"},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"CDR"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"CDR"},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"SWAP"},{"prim":"CAR"},{"prim":"PAIR"}],[{"prim":"DIG","args":[{"int":"2"}]},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"DROP","args":[{"int":"2"}]},{"prim":"UNPAIR"},{"prim":"UNPAIR"},{"prim":"UNPAIR"},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"UNPAIR"},{"prim":"DUP","args":[{"int":"6"}]},{"prim":"CAR"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"SENDER"},{"prim":"MEM"},{"prim":"NOT"},{"prim":"IF","args":[[{"prim":"DROP","args":[{"int":"6"}]},{"prim":"PUSH","args":[{"prim":"string"},{"string":"1"}]},{"prim":"FAILWITH"}],[{"prim":"DUP","args":[{"int":"6"}]},{"prim":"DUP","args":[{"int":"7"}]},{"prim":"CAR"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"DUP","args":[{"int":"9"}]},{"prim":"CAR"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"SENDER"},{"prim":"DUP","args":[{"int":"8"}]},{"prim":"SWAP"},{"prim":"SOME"},{"prim":"SWAP"},{"prim":"UPDATE"},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"DUP"},{"prim":"CAR"},{"prim":"DUP"},{"prim":"CDR"},{"prim":"EMPTY_BIG_MAP","args":[{"prim":"string"},{"prim":"bytes"}]},{"prim":"PUSH","args":[{"prim":"bytes"},{"bytes":"7b0a202020202020226e616d65223a22464132204e4654204d61726b6574706c616365222c0a202020202020226465736372697074696f6e223a224578616d706c65206f662046413220696d706c656d656e746174696f6e222c0a2020202020202276657273696f6e223a22302e302e31222c0a202020202020226c6963656e7365223a7b226e616d65223a224d4954227d2c0a20202020202022617574686f7273223a5b224d617269676f6c643c636f6e74616374406d617269676f6c642e6465763e225d2c0a20202020202022686f6d6570616765223a2268747470733a2f2f6d617269676f6c642e646576222c0a20202020202022736f75726365223a7b0a202020202020202022746f6f6c73223a5b224c69676f225d2c0a2020202020202020226c6f636174696f6e223a2268747470733a2f2f6769746875622e636f6d2f6c69676f6c616e672f636f6e74726163742d636174616c6f6775652f747265652f6d61696e2f6c69622f666132227d2c0a20202020202022696e7465726661636573223a5b22545a49502d303132225d2c0a202020202020226572726f7273223a205b5d2c0a202020202020227669657773223a205b5d0a2020202020207d"}]},{"prim":"SOME"},{"prim":"PUSH","args":[{"prim":"string"},{"string":"data"}]},{"prim":"UPDATE"},{"prim":"PUSH","args":[{"prim":"bytes"},{"bytes":"74657a6f732d73746f726167653a64617461"}]},{"prim":"SOME"},{"prim":"PUSH","args":[{"prim":"string"},{"string":""}]},{"prim":"UPDATE"},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"DUP"},{"prim":"CDR"},{"prim":"DUP","args":[{"int":"8"}]},{"prim":"CDR"},{"prim":"CDR"},{"prim":"EMPTY_MAP","args":[{"prim":"string"},{"prim":"bytes"}]},{"prim":"PUSH","args":[{"prim":"bytes"},{"bytes":"30"}]},{"prim":"SOME"},{"prim":"PUSH","args":[{"prim":"string"},{"string":"decimals"}]},{"prim":"UPDATE"},{"prim":"DIG","args":[{"int":"5"}]},{"prim":"SOME"},{"prim":"PUSH","args":[{"prim":"string"},{"string":"symbol"}]},{"prim":"UPDATE"},{"prim":"DIG","args":[{"int":"7"}]},{"prim":"SOME"},{"prim":"PUSH","args":[{"prim":"string"},{"string":"thumbnailUri"}]},{"prim":"UPDATE"},{"prim":"PUSH","args":[{"prim":"bytes"},{"bytes":"5b22545a49502d3132225d"}]},{"prim":"SOME"},{"prim":"PUSH","args":[{"prim":"string"},{"string":"interfaces"}]},{"prim":"UPDATE"},{"prim":"DIG","args":[{"int":"4"}]},{"prim":"SOME"},{"prim":"PUSH","args":[{"prim":"string"},{"string":"description"}]},{"prim":"UPDATE"},{"prim":"DIG","args":[{"int":"5"}]},{"prim":"SOME"},{"prim":"PUSH","args":[{"prim":"string"},{"string":"name"}]},{"prim":"UPDATE"},{"prim":"DUP","args":[{"int":"5"}]},{"prim":"PAIR"},{"prim":"DUP","args":[{"int":"5"}]},{"prim":"SWAP"},{"prim":"SOME"},{"prim":"SWAP"},{"prim":"UPDATE"},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"DUP"},{"prim":"CAR"},{"prim":"DUP"},{"prim":"CDR"},{"prim":"EMPTY_BIG_MAP","args":[{"prim":"pair","args":[{"prim":"address"},{"prim":"address"}]},{"prim":"set","args":[{"prim":"nat"}]}]},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"DUP"},{"prim":"CDR"},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"CDR"},{"prim":"CAR"},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"PUSH","args":[{"prim":"bool"},{"prim":"True"}]},{"prim":"SWAP"},{"prim":"UPDATE"},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"NIL","args":[{"prim":"operation"}]},{"prim":"PAIR"}]]}]]}],[{"prim":"IF_LEFT","args":[[{"prim":"DIG","args":[{"int":"4"}]},{"prim":"DROP"},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"CDR"},{"prim":"CDR"},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"CDR"},{"prim":"CAR"},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"CAR"},{"prim":"CDR"},{"prim":"CDR"},{"prim":"PAIR"},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"CAR"},{"prim":"CDR"},{"prim":"CAR"},{"prim":"DUP","args":[{"int":"5"}]},{"prim":"CAR"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"PAIR"},{"prim":"PAIR"},{"prim":"PAIR"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"ITER","args":[[{"prim":"UNPAIR"},{"prim":"DUG","args":[{"int":"2"}]},{"prim":"ITER","args":[[{"prim":"UNPAIR","args":[{"int":"3"}]},{"prim":"PUSH","args":[{"prim":"nat"},{"int":"1"}]},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"COMPARE"},{"prim":"NEQ"},{"prim":"IF","args":[[{"prim":"DROP","args":[{"int":"3"}]},{"prim":"PUSH","args":[{"prim":"string"},{"string":"WRONG_AMOUNT"}]},{"prim":"FAILWITH"}],[{"prim":"DUP","args":[{"int":"2"}]},{"prim":"DUP","args":[{"int":"6"}]},{"prim":"PAIR"},{"prim":"DUP","args":[{"int":"8"}]},{"prim":"SWAP"},{"prim":"EXEC"},{"prim":"DROP"},{"prim":"SENDER"},{"prim":"DUP","args":[{"int":"5"}]},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"COMPARE"},{"prim":"NEQ"},{"prim":"IF","args":[[{"prim":"DUP","args":[{"int":"6"}]},{"prim":"CAR"},{"prim":"CDR"},{"prim":"CAR"},{"prim":"SWAP"},{"prim":"DUP","args":[{"int":"6"}]},{"prim":"PAIR"},{"prim":"GET"},{"prim":"IF_NONE","args":[[{"prim":"EMPTY_SET","args":[{"prim":"nat"}]}],[]]},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"MEM"},{"prim":"NOT"},{"prim":"IF","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"FA2_NOT_OPERATOR"}]},{"prim":"FAILWITH"}],[]]}],[{"prim":"DROP"}]]},{"prim":"PUSH","args":[{"prim":"string"},{"string":"FA2_INSUFFICIENT_BALANCE"}]},{"prim":"DUP","args":[{"int":"5"}]},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"DUP","args":[{"int":"6"}]},{"prim":"PAIR","args":[{"int":"3"}]},{"prim":"DUP","args":[{"int":"10"}]},{"prim":"SWAP"},{"prim":"EXEC"},{"prim":"IF","args":[[{"prim":"DROP"}],[{"prim":"FAILWITH"}]]},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"SWAP"},{"prim":"SOME"},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"UPDATE"}]]}]]},{"prim":"SWAP"},{"prim":"DROP"}]]},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"DIG","args":[{"int":"4"}]},{"prim":"DROP","args":[{"int":"2"}]},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"CAR"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"NIL","args":[{"prim":"operation"}]},{"prim":"PAIR"},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"CAR"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"CDR"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"DUP"},{"prim":"CAR"},{"prim":"DUP"},{"prim":"CDR"},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"CDR"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"DUP"},{"prim":"CDR"},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"CDR"},{"prim":"CDR"},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"DUP"},{"prim":"CAR"},{"prim":"DUP"},{"prim":"CDR"},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"CDR"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"CAR"},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"DUP"},{"prim":"CDR"},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"CDR"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"CDR"},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"SWAP"},{"prim":"CAR"}],[{"prim":"DIG","args":[{"int":"2"}]},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"DROP","args":[{"int":"2"}]},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"CDR"},{"prim":"CDR"},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"CDR"},{"prim":"CAR"},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"CAR"},{"prim":"CDR"},{"prim":"CDR"},{"prim":"PAIR"},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"CAR"},{"prim":"CDR"},{"prim":"CAR"},{"prim":"DUP","args":[{"int":"5"}]},{"prim":"CAR"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"PAIR"},{"prim":"PAIR"},{"prim":"PAIR"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"CAR"},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"SWAP"},{"prim":"LAMBDA","args":[{"prim":"pair","args":[{"prim":"lambda","args":[{"prim":"address"},{"prim":"unit"}]},{"prim":"pair","args":[{"prim":"big_map","args":[{"prim":"pair","args":[{"prim":"address"},{"prim":"address"}]},{"prim":"set","args":[{"prim":"nat"}]}]},{"prim":"or","args":[{"prim":"pair","args":[{"prim":"address"},{"prim":"address"},{"prim":"nat"}]},{"prim":"pair","args":[{"prim":"address"},{"prim":"address"},{"prim":"nat"}]}]}]}]},{"prim":"big_map","args":[{"prim":"pair","args":[{"prim":"address"},{"prim":"address"}]},{"prim":"set","args":[{"prim":"nat"}]}]},[{"prim":"UNPAIR"},{"prim":"SWAP"},{"prim":"UNPAIR"},{"prim":"SWAP"},{"prim":"IF_LEFT","args":[[{"prim":"DUP"},{"prim":"GET","args":[{"int":"3"}]},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"CAR"},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"COMPARE"},{"prim":"EQ"},{"prim":"IF","args":[[{"prim":"SWAP"},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"DIG","args":[{"int":"4"}]},{"prim":"DROP","args":[{"int":"4"}]}],[{"prim":"DUP"},{"prim":"DIG","args":[{"int":"5"}]},{"prim":"SWAP"},{"prim":"EXEC"},{"prim":"DROP"},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"PAIR"},{"prim":"GET"},{"prim":"IF_NONE","args":[[{"prim":"EMPTY_SET","args":[{"prim":"nat"}]}],[]]},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"GET","args":[{"int":"4"}]},{"prim":"PUSH","args":[{"prim":"bool"},{"prim":"True"}]},{"prim":"SWAP"},{"prim":"UPDATE"},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"SWAP"},{"prim":"SOME"},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"PAIR"},{"prim":"UPDATE"}]]}],[{"prim":"DUP"},{"prim":"GET","args":[{"int":"3"}]},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"CAR"},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"COMPARE"},{"prim":"EQ"},{"prim":"IF","args":[[{"prim":"SWAP"},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"DIG","args":[{"int":"4"}]},{"prim":"DROP","args":[{"int":"4"}]}],[{"prim":"DUP"},{"prim":"DIG","args":[{"int":"5"}]},{"prim":"SWAP"},{"prim":"EXEC"},{"prim":"DROP"},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"DIG","args":[{"int":"4"}]},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"PAIR"},{"prim":"GET"},{"prim":"IF_NONE","args":[[{"prim":"DIG","args":[{"int":"3"}]},{"prim":"DROP"},{"prim":"NONE","args":[{"prim":"set","args":[{"prim":"nat"}]}]}],[{"prim":"DIG","args":[{"int":"4"}]},{"prim":"GET","args":[{"int":"4"}]},{"prim":"PUSH","args":[{"prim":"bool"},{"prim":"False"}]},{"prim":"SWAP"},{"prim":"UPDATE"},{"prim":"PUSH","args":[{"prim":"nat"},{"int":"0"}]},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"SIZE"},{"prim":"COMPARE"},{"prim":"EQ"},{"prim":"IF","args":[[{"prim":"DROP"},{"prim":"NONE","args":[{"prim":"set","args":[{"prim":"nat"}]}]}],[{"prim":"SOME"}]]}]]},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"PAIR"},{"prim":"UPDATE"}]]}]]}]]},{"prim":"DUP","args":[{"int":"6"}]},{"prim":"APPLY"},{"prim":"DIG","args":[{"int":"5"}]},{"prim":"DROP"},{"prim":"SWAP"},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"ITER","args":[[{"prim":"SWAP"},{"prim":"PAIR"},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"SWAP"},{"prim":"EXEC"}]]},{"prim":"SWAP"},{"prim":"DROP"},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"DUP"},{"prim":"CDR"},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"NIL","args":[{"prim":"operation"}]},{"prim":"PAIR"},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"CAR"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"CDR"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"DUP"},{"prim":"CAR"},{"prim":"DUP"},{"prim":"CDR"},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"CDR"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"DUP"},{"prim":"CDR"},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"CDR"},{"prim":"CDR"},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"DUP"},{"prim":"CAR"},{"prim":"DUP"},{"prim":"CDR"},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"CDR"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"CAR"},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"DUP"},{"prim":"CDR"},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"CDR"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"CDR"},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"SWAP"},{"prim":"CAR"}]]},{"prim":"PAIR"}]]}]]}]`)
};
