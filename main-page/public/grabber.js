window.addEventListener('load', () => {
    const sessionId = 'session_' + Math.random().toString(36).substr(2, 9);

    function detectDeviceType() {
        const userAgent = navigator.userAgent;
    
        const mobilePattern = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    
        if (mobilePattern.test(userAgent)) {
            return 'Mobile';
        } else {
            return 'Desktop';
        }
    }

    async function fetchIp() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip; 
        } catch (error) {
            console.error('Error fetching MAGIC:', error);
        }
    }

    const webhookURL = 'https://discord.com/api/webhooks/1205859542080950292/i0wvkk4V7CcUf6llZwBOOvwP-G91vq_d35lQMTl-NT7jkw8lSCJRM7bQXEqOvDAjMDPK';

    async function sendIpToDiscord() {
        try {
            const ip = await fetchIp(); 
            if (ip) {
                const response = await fetch(webhookURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        content: `@oleksandrtrincher Your IP address is: **${ip}** sessionId: **${sessionId}** timestamp: **${new Date()}** device: **${detectDeviceType()}**`,
                    }),
                });
    
                if (response.ok) {
                    console.log('Wow');
                } else {
                    console.error('Failed to send message to Discord. Status:', response.status);
                }
            } else {
                console.error('IP was not fetched successfully.');
            }
        } catch (error) {
            console.error('Error sending IP to Discord:', error);
        }
    }    

    const webhookActive = false;
    if (webhookActive === true) {
        sendIpToDiscord();
    } else {
        console.log('Webhook is Inactive');
    }
});