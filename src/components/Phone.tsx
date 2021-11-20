import chat from '../images/chat.jpg'
import rasa from '../images/rasa.jpg'
function Phone() {
    return (

        <div className="mockup-phone border-primary">
            <div className="camera"></div>
            <div className="display">
                <div className="artboard phone-1 artboard-demo">
                    <img className="h-3/5" src={chat} alt="chat" />
                    <div className="text-center font-bold ml-12 mr-8 mt-5">
                        Powered by<img className="mx-auto w-1/3 " src={rasa} alt="chat" />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Phone
