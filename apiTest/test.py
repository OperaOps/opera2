import requests
import datetime

# Greyfinch GraphQL endpoint
API_URL = "https://connect-api.greyfinch.com/v1/graphql"

# Replace with your real API key and secret from Greyfinch (Settings > Developers)
API_KEY = "pk_user_pcK2+6R5H/DJiNLzZvW8dnydQ6UgLeP5"
API_SECRET = "sk_user_c1PDU7HA3KgnBJ1e3NomYcF6pd7j1ydB"

def api_login() -> str:
    """Login with key+secret and return accessToken."""
    mutation = """
    mutation login($key: String!, $secret: String!) {
      apiLogin(key: $key, secret: $secret) {
        accessToken
        accessTokenExpiresIn
        status
      }
    }
    """
    resp = requests.post(API_URL, json={"query": mutation, "variables": {
        "key": API_KEY,
        "secret": API_SECRET
    }})
    resp.raise_for_status()
    data = resp.json()
    if "errors" in data:
        raise RuntimeError(f"Login failed: {data['errors']}")
    return data["data"]["apiLogin"]["accessToken"]

def get_todays_agenda(access_token: str):
    """Run the exact docs query to fetch today's agenda."""
    query = """
    query docs_todays_agenda {
      appointmentBookings(where: { localStartDate: { _eq: "now()" } }) {
        localStartDate
        localStartTime
        appointment {
          patient {
            person {
              firstName
            }
          }
        }
      }
    }
    """
    headers = {"Authorization": f"Bearer {access_token}"}
    resp = requests.post(API_URL, headers=headers, json={"query": query})
    resp.raise_for_status()
    data = resp.json()
    if "errors" in data:
        raise RuntimeError(f"Query failed: {data['errors']}")
    return data["data"]["appointmentBookings"]

if __name__ == "__main__":
    token = api_login()
    bookings = get_todays_agenda(token)

    print("Today's Agenda")
    if not bookings:
        print("- No bookings found.")
    else:
        for b in bookings:
            name = b["appointment"]["patient"]["person"]["firstName"]
            print(f"- {b['localStartDate']} {b['localStartTime']}: {name}")