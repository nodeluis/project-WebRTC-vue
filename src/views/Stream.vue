<template>
    <v-container>
        <v-btn @click="conectar">{{connect}}</v-btn>
        <v-btn @click="pers"></v-btn>
        <v-btn v-for="(item,index) in escucha" :key="index+1000">{{item}}</v-btn>
        <video controls autoplay v-for="(item,index) in streams" :key="index" :srcObject.prop="item.stream"></video>
    </v-container>
</template>

<script>

import Peer from 'simple-peer'

export default {
    data(){
        return{
            connect:'conectar',
            idSoc:this.$socket.id,
            localStream:null,
            escucha:[],
            peersSend:[],
            peersListen:[],
            streams:[]
        }
    },
    sockets:{
        connect() {
            console.log('socket connected')
        },
        customEmit(data) {
            console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        }
    },
    methods:{
        str(stream){
            //console.log(stream.getTracks());
            this.localStream=stream;

            this.escucha.forEach(element => {
                if(element.id!=this.idSoc){
                    this.peersSend.push({
                        id:element.id,
                        peer:new Peer({
                            initiator:true,
                            trickle:false,
                            stream:this.localStream
                        })
                    });
                }
            });   
            this.peersSend.forEach(element => {
                element.peer.on('signal',(data)=>{
                    this.$socket.emit('p2p',{
                        id:element.id,
                        data:JSON.stringify(data),
                        remitId:this.$socket.id 
                    });
                });
                element.peer.on('error', err => console.log('error', err));
                element.peer.on('close', () => {
                    console.log('una conexion se cerro');
                })
            });
        },
        async conectar(){
            if(this.connect=='conectar'){
                
                navigator.getUserMedia=(navigator.getUserMedia
                           || navigator.webkitGetUserMedia 
                           || navigator.mozGetUserMedia 
                           || navigator.msGetUserMedia);
                
                const gdmOptions = {
                    video: {
                        cursor: "always",
                        width:800,
                        height:400
                    },
                }
                const stream = await navigator.mediaDevices.getDisplayMedia(gdmOptions);
                const stream2 = await navigator.mediaDevices.getUserMedia({audio:true});
                const mediastream= new MediaStream();
                stream.getTracks().forEach(element => {
                    mediastream.addTrack(element);
                });
                stream2.getTracks().forEach(element => {
                    mediastream.addTrack(element);
                });
                this.str(mediastream);
                this.connect='desconectar';
            }else{
                this.peersSend.forEach(element => {
                    this.$socket.emit('p2pdestroy',{
                        id:element.id,
                        remitId:this.idSoc
                    });
                    element.peer.destroy();
                });
                await this.localStream.getTracks().forEach(element => {
                    element.stop();
                });
                this.peersSend=[];
                this.connect='conectar';
            }
        },
        pers(){
            console.log(this.peersSend);
            console.log(this.peersListen);
        }
    },
    created(){
        if(!localStorage.getItem('stream')){
            this.$router.push('/404');
        }
        this.$socket.emit('conectados',{id:this.idSoc,nick:localStorage.getItem('nick')});

        this.$options.sockets.conectados=(dat=>{
            this.escucha=dat;
        });

        this.$options.sockets.p2pinit=(dat=>{
            let signally={
                id:dat.id,
                peer:new Peer({
                    initiator:true,
                    trickle:false
                })
            };
            signally.peer.on('signal',(data)=>{
                this.$socket.emit('p2p',{
                    id:dat.id,
                    data:JSON.stringify(data),
                    remitId:this.$socket.id 
                });
            });
            signally.peer.on('error', err => console.log('error', err));
            signally.peer.on('close', () => {
                console.log('una conexion se cerro');
            });
            signally.peer.addStream(this.localStream);
            this.peersSend.push(signally);
        });
        
        this.$options.sockets.p2p=(dat=>{
            let signally={
                id:dat.remitId,
                peer:new Peer({
                    initiator:false,
                    trickle:false
                })
            };
            signally.peer.signal(dat.data);
            signally.peer.on('signal',(data)=>{
                this.$socket.emit('p2pres',{
                    id:dat.remitId,
                    data:JSON.stringify(data),
                    remitId:this.$socket.id 
                });
            });
            signally.peer.on('stream',(stream2)=>{
                this.streams.push({
                    id:dat.remitId,
                    stream:stream2
                });
            });
            signally.peer.on('error', err => console.log('error', err));
            signally.peer.on('close', () => {
                console.log('una conexion se cerro');
            })
            this.peersListen.push(signally);
        });

        this.$options.sockets.p2pres=(dat=>{
            let index=this.peersSend.findIndex(d=>{return d.id==dat.remitId});
            if(index!=-1){
                this.peersSend[index].peer.signal(dat.data);
            }

        });

        this.$options.sockets.p2pdestroy=(dat=>{            
            let index=this.peersListen.findIndex(d=>{return d.id==dat.remitId});
            let index2=this.streams.findIndex(d=>{return d.id==dat.remitId});
            if(index!=-1){
                this.peersListen[index].peer.destroy();
                this.peersListen.splice(index,1);
            }
            if(index2!=-1){
                this.streams.splice(index2,1);
            }
        });

        this.$options.sockets.remove=(dat=>{
            let index=this.peersSend.findIndex(d=>{return d.id==dat.id});
            let index2=this.peersListen.findIndex(d=>{return d.id==dat.id});
            let index3=this.streams.findIndex(d=>{return d.id==dat.id});
            if(index!=-1){
                this.peersSend[index].peer.destroy();
                this.peersSend.splice(index,1);
            }
            if(index2!=-1){
                this.peersListen[index2].peer.destroy();
                this.peersListen.splice(index2,1);
            }
            if(index3!=-1){
                this.streams.splice(index3,1);
            }
            this.escucha=dat.content;
        });
    }
}
</script>