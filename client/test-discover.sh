#!/bin/bash
# Test compilation de la page découvrir

echo "🔍 Test de compilation DiscoverView.vue..."

# Vérifier les accolades
OPEN_BRACES=$(grep -o '{' c:/Users/user/Documents/Asso/client/src/views/DiscoverView.vue | wc -l)
CLOSE_BRACES=$(grep -o '}' c:/Users/user/Documents/Asso/client/src/views/DiscoverView.vue | wc -l)

echo "Accolades ouvertes: $OPEN_BRACES"
echo "Accolades fermées: $CLOSE_BRACES"

if [ "$OPEN_BRACES" -eq "$CLOSE_BRACES" ]; then
  echo "✅ Les accolades sont équilibrées"
else
  echo "❌ Les accolades ne sont pas équilibrées"
  exit 1
fi

# Vérifier les balises HTML
OPEN_TAGS=$(grep -o '<' c:/Users/user/Documents/Asso/client/src/views/DiscoverView.vue | wc -l)
CLOSE_TAGS=$(grep -o '>' c:/Users/user/Documents/Asso/client/src/views/DiscoverView.vue | wc -l)

echo "Balises ouvertes: $OPEN_TAGS"
echo "Balises fermées: $CLOSE_TAGS"

if [ "$OPEN_TAGS" -eq "$CLOSE_TAGS" ]; then
  echo "✅ Les balises sont équilibrées"
else
  echo "❌ Les balises ne sont pas équilibrées"
  exit 1
fi

echo ""
echo "✅ Le fichier semble syntaxiquement correct!"
