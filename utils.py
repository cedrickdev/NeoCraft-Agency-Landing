def classify_query(query: str) -> str:
    """Retourne une catégorie simple selon la nature de la question."""
    q = query.lower().strip()

    greetings = ["hello", "hi", "salut", "bonjour", "yo"]
    identity = ["who are you", "what is your name", "tu es qui", "comment tu t’appelles", "quel est ton nom"]
    thanks = ["thank you", "merci"]

    if any(g in q for g in greetings):
        return "greeting"
    elif any(i in q for i in identity):
        return "identity"
    elif any(t in q for t in thanks):
        return "thanks"
    return "default"


def format_result(query: str, result: str) -> str:
    q_type = classify_query(query)

    if q_type == "identity":
        return "Je suis NeoBot, l’assistant virtuel de l’agence NeoCraft."
    elif q_type == "greeting":
        return "Bonjour ! Comment puis-je vous aider aujourd’hui ?"
    elif q_type == "thanks":
        return "Avec plaisir ! 😊"
    
    return result  # pour tout le reste, on garde le RAG normal
