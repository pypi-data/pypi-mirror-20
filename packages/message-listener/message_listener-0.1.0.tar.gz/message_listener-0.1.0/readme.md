What it is
===
App used at Raspberry Pi as receiver of incoming messages and pas them to registered handlers 
(relay, screen, some sensors) 

    from message_listener.server import Server
    
    msg = Message('rpi1')
    svr = Server(msg)
    svr.run()

Read more: [--](--)


