

const AiRewiteBtn = ({
    isActive,
    onRewrite,
    onUndo
}) => {
    
    return (
        <button
            className={`ai-rewrite-btn ${isActive ? "active" : ""}`}
            onClick={isActive ? onUndo : onRewrite}
            type="button"
        >
            {isActive ? "Undo AI Rewrite" : "AI Rewrite"}
        </button>
    );
}

export default AiRewiteBtn;