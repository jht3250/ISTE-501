#!/bin/bash
cd "$(dirname "$0")"

echo "================================================"
echo "           BirdBox - Installation"
echo "================================================"
echo ""

# ================================================
# CHECK / INSTALL HOMEBREW
# ================================================
echo "[1/4] Checking Homebrew..."
if ! command -v brew &> /dev/null; then
    echo "Homebrew not found. Installing..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    # Add brew to PATH for Apple Silicon Macs
    if [ -f "/opt/homebrew/bin/brew" ]; then
        eval "$(/opt/homebrew/bin/shellenv)"
    fi
    echo "Homebrew installed."
else
    echo "Homebrew already installed."
fi

# ================================================
# CHECK / INSTALL NODE.JS
# ================================================
echo ""
echo "[2/4] Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "Node.js not found. Installing..."
    brew install node@22
    brew link node@22 --force
    echo "Node.js installed."
else
    echo "Node.js already installed."
fi

# ================================================
# CHECK / INSTALL PYTHON
# ================================================
echo ""
echo "[3/4] Checking Python..."
if ! command -v python3 &> /dev/null; then
    echo "Python not found. Installing..."
    brew install python@3.11
    echo "Python installed."
else
    echo "Python already installed."
fi

# ================================================
# INSTALL NODE DEPENDENCIES
# ================================================
echo ""
echo "[4/4] Installing Node packages..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: npm install failed. Check your internet connection and try again."
    read -p "Press enter to exit..."
    exit 1
fi
echo "Node packages installed."

# ================================================
# INSTALL PYTHON DEPENDENCIES
# ================================================
echo ""
echo "[5/5] Installing Python packages..."
if [ -f "ml/requirements.txt" ]; then
    echo "Downloading and installing Python packages, this may take a while..."
    pip3 install -r ml/requirements.txt
    if [ $? -ne 0 ]; then
        echo "ERROR: pip install failed. Check your internet connection and try again."
        read -p "Press enter to exit..."
        exit 1
    fi
    echo "Python packages installed."
else
    echo "No requirements.txt found, skipping."
fi

# ================================================
# CREATE LAUNCH SCRIPT
# ================================================
echo ""
echo "Creating launch script..."
cat > launch.sh << 'EOF'
#!/bin/bash
cd "$(dirname "$0")"
echo "Starting BirdBox, please wait..."
npm start &
sleep 5
./node_modules/.bin/electron .
EOF
chmod +x launch.sh

echo ""
echo "================================================"
echo "        Installation Complete!"
echo "================================================"
echo ""
echo "To start BirdBox, run: ./launch.sh"
echo "Or double-click launch.sh in Finder"
echo "Note: First launch may take up to 30 seconds."
echo ""
read -p "Press enter to exit..."