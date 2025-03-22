console.log("welcome to spotify");
let songindex=0;
let audioelement=new Audio('songs/1.m4a');
let masterplay=document.getElementById('masterplay');
let myprogressbar=document.getElementById('myprogressbar')
let gif=document.getElementById('gif')
let songitem=Array.from(document.getElementsByClassName('songitem'))
let variable=0;

let mastersongname=document.getElementById('mastersongname')
let songs=[
    {songname:"Be With You - Akon",filepath :"songs/1.m4a",coverpath:"covers/1.jpg"},
    {songname:"Closer - The Chainsmokers",filepath :"songs/2.m4a",coverpath:"covers/2.jpg"},
    {songname:"Girls Like You - Maroon 5",filepath :"songs/3.m4a",coverpath:"covers/3.jpg"},
    {songname:"Heat Waves - Glass Animals",filepath :"songs/4.m4a",coverpath:"covers/4.jpg"},
    {songname:"Night Changes - One Direction",filepath :"songs/5.m4a",coverpath:"covers/5.jpg"},
    {songname:"Perfect - Ed Sheeran",filepath :"songs/6.m4a",coverpath:"covers/6.jpg"},
    {songname:"Rude - MAGIC!",filepath :"songs/7.m4a",coverpath:"covers/7.jpg"},
    {songname:"Señorita - Shawn Mendes,Camila Cabello",filepath :"songs/8.m4a",coverpath:"covers/8.jpg"},
    {songname:"Shape of You - Ed Sheeran",filepath :"songs/9.m4a",coverpath:"covers/9.jpg"},
    {songname:"Stay - The Kid LAROI, Justin Bieber",filepath :"songs/10.m4a",coverpath:"covers/10.jpg"},
    {songname:"Steal My Girl - One Direction",filepath :"songs/11.m4a",coverpath:"covers/11.jpg"},
    {songname:"We Don't Talk Anymore - Charlie Puth",filepath :"songs/12.m4a",coverpath:"covers/12.jpg"},
]
//naam or photo k lie
songitem.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverpath;
    element.getElementsByTagName("span")[0].innerText=songs[i].songname
})

//play song neeche wala bar
masterplay.addEventListener('click',()=>{
    if(audioelement.paused || audioelement.currentTime<=0){
        audioelement.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        gif.style.opacity=1;
        let songItemPlay=document.getElementById(songindex)
        if (songItemPlay) {
            makelallplays(); // Reset all icons first
            songItemPlay.classList.remove('fa-play');
            songItemPlay.classList.add('fa-pause');
    }
    else{
        audioelement.pause();
        masterplay.classList.remove('fa-pause');
        masterplay.classList.add('fa-play');
        gif.style.opacity=0;
        let songItemPlay=document.getElementById(songindex);
        if (songItemPlay) {
            songItemPlay.classList.remove('fa-pause');
            songItemPlay.classList.add('fa-play');
        }
    }
}})

//progress bar-- ko scroll krke edit krne k lie

audioelement.addEventListener('timeupdate',()=>{
    progress=parseInt((audioelement.currentTime/audioelement.duration)*100)
    myprogressbar.value=progress;
})
myprogressbar.addEventListener('input',()=>{
    audioelement.currentTime=(myprogressbar.value)*(audioelement.duration)/100;
})


// upper wale tabs m edit krne k lie

const makelallplays=()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
};

Array.from(document.getElementsByClassName('songitemplay')).forEach((element, index)=> {
   element.addEventListener('click', (e)=> {
        if (songindex===index) {  
            if (audioelement.paused) {
                audioelement.play();
                e.target.classList.remove('fa-play');
                e.target.classList.add('fa-pause');
                masterplay.classList.remove('fa-play');
                masterplay.classList.add('fa-pause');
                gif.style.opacity=1;
            } else {
                audioelement.pause();
                e.target.classList.remove('fa-pause');
                e.target.classList.add('fa-play');
                masterplay.classList.remove('fa-pause');
                masterplay.classList.add('fa-play');
                gif.style.opacity=0;
            }
        } else {
            
            makelallplays();
            songindex=index;
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            audioelement.src=songs[songindex].filepath;
            audioelement.play(); 
            masterplay.classList.remove('fa-play');
            masterplay.classList.add('fa-pause');
            mastersongname.innerText=songs[songindex].songname;
            gif.style.opacity=1;
        }
    });
});


    
document.getElementById('next').addEventListener('click',()=>{
    if (songindex===11) {
        songindex=0;
    }
    else{
        songindex+=1;
        }
    audioelement.src=`songs/${songindex+1}.m4a`
    audioelement.play();
    audioelement.currentTime=0;
    masterplay.classList.remove('fa-play')
    masterplay.classList.add('fa-pause')
    mastersongname.innerText=songs[songindex].songname
})
document.getElementById('previous').addEventListener('click',()=>{
    if (songindex===0) {
        songindex=11;
    }
    else{
        songindex-=1;
        }
    audioelement.src=`songs/${songindex+1}.m4a`
    audioelement.play();
    audioelement.currentTime=0;
    masterplay.classList.remove('fa-play')
    masterplay.classList.add('fa-pause')
    mastersongname.innerText=songs[songindex].songname
})


audioelement.addEventListener('ended', ()=> {
    if (songindex===songs.length - 1) {
        songindex=0; 
    } else {
        songindex+=1;
    }

    audioelement.src=songs[songindex].filepath;
    audioelement.currentTime=0;
    audioelement.play();

   
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
    mastersongname.innerText=songs[songindex].songname;
    gif.style.opacity=1;

    makelallplays();
    let songItemPlay=document.getElementById(songindex);
    if (songItemPlay) {
        songItemPlay.classList.remove('fa-play');
        songItemPlay.classList.add('fa-pause');
    }
});
