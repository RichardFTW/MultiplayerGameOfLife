var blockArray

function pushBlock(x, y){
    
    blockArray[blockArray.length] = x;
    
    //Length changed so it stays the same
    
    blockArray[blockArray.length] = y;
    
}

function sendBlocks(blockArray, player){
    
    // This passes 2 vars: player (player number ex 1) and data: {1,1, 4,9, 3,5}
    
    socket.emit('clientEvent', {player: player, data: blockArray});
}