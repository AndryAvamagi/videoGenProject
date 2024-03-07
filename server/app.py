import whisper_timestamped
from gtts import gTTS
from os import path
from moviepy.editor import *
from moviepy.video.fx.all import crop
from math import floor
from random import randint
from flask import Flask, jsonify, render_template, request, redirect, session, send_file
from flask_cors import CORS, cross_origin

app = Flask(__name__) #flask app instance
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/api/getdata", methods=['POST'])
def getdata():
    if request.method == 'POST':
        data = request.get_json()
        print(data)

        textContent : str = data['text']
        videoType : str = data['videoType']

        myObj = gTTS(textContent, lang='en', slow=False)
        myObj.save('./audio.mp3')
        audio = AudioFileClip('./audio.mp3')
        soundDuration = floor(audio.duration)+1
        audio = CompositeAudioClip([audio])


        baseVideo = VideoFileClip(f'{videoType}.mp4')
        baseVideoDuration = baseVideo.duration

        randomPointAtVideo = randint(20, floor(baseVideoDuration-soundDuration))

        video = baseVideo.subclip(randomPointAtVideo, randomPointAtVideo + soundDuration)
        (w, h) = video.size
        video = crop(video, width=480, height=720, x_center=w/2, y_center=h/2)
        video.audio = audio

        model = whisper_timestamped.load_model('base')
        useAudio = whisper_timestamped.load_audio("audio.mp3")
        result = whisper_timestamped.transcribe(model, useAudio)

        subs = [video]

        for segment in result['segments']:
            for word in segment['words']:
                text = word['text']
                start = word['start']
                end = word['end']
                dur = end - start
                if text != "":
                    txtClip = TextClip(txt=text, fontsize=80, font='C059-Bold', stroke_width=4, stroke_color='black', color='white')
                    txtClip = txtClip.set_start(start).set_duration(dur).set_pos(('center', 'center'))
                    subs.append(txtClip)

        video = CompositeVideoClip(subs)
        video.write_videofile('./result.mp4')

        return send_file('result.mp4', download_name='textToSpeechVideo.mp4')

    return jsonify({"message" : "ei toota"})






@app.route("/api", methods=['GET'])
def return_api():
    return jsonify({
        "message" : "Tootab"
    })


if __name__ == "__main__" :
    app.run(host='0.0.0.0', port='5000') #debug=True only in dev mode\
        
