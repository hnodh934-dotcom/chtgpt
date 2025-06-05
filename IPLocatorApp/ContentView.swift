import SwiftUI

struct IPInfo: Decodable {
    let query: String
    let country: String
    let regionName: String
    let city: String
}

class IPService: ObservableObject {
    @Published var info: IPInfo?
    @Published var error: String?

    func fetchIPInfo() async {
        let url = URL(string: "https://ip-api.com/json")!
        do {
            let (data, _) = try await URLSession.shared.data(from: url)
            let decoded = try JSONDecoder().decode(IPInfo.self, from: data)
            await MainActor.run {
                self.info = decoded
            }
        } catch {
            await MainActor.run {
                self.error = error.localizedDescription
            }
        }
    }
}

struct ContentView: View {
    @StateObject private var service = IPService()

    var body: some View {
        VStack(spacing: 20) {
            if let info = service.info {
                Text("IP: \(info.query)")
                Text("Country: \(info.country)")
                Text("Region: \(info.regionName)")
                Text("City: \(info.city)")
            } else if let error = service.error {
                Text("Error: \(error)")
            } else {
                Text("Tap button to fetch IP info")
            }
            Button("Fetch IP Info") {
                Task { await service.fetchIPInfo() }
            }
            .padding()
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
