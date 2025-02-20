import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const JobPostings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/jobs?page=1", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        console.log("Fetched Jobs:", data);
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    getJobs();
  }, []);

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} color="black" padding={10} />
        <Text style={styles.heading}>Let's land you the job you've earned</Text>
        <Text style={styles.subText}>
          Explore opportunities picked based on your profile and activity. Your
          dream job is closer than you think!
        </Text>
      </View>

      {/* Job Listings */}
      <View style={styles.jobSection}>
        <Text style={styles.sectionTitle}>Jobs for you</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : jobs.length === 0 ? (
          <Text style={styles.noJobs}>No jobs found.</Text>
        ) : (
          <FlatList
            data={jobs}
            keyExtractor={(job) => job.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.jobCard}>
                <View style={styles.jobInfo}>
                  <Text style={styles.jobTitle}>{item.name}</Text>
                  <Text style={styles.companyName}>
                    {item.company?.name || "N/A"}
                  </Text>

                  <View style={styles.jobBottom}>
                    <Text style={styles.location}>
                      {item.locations?.[0]?.name || "Remote"}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => Linking.openURL(item.refs.landing_page)}
                  style={styles.redirectButton}
                >
                  <Ionicons name="open-outline" size={22} color="#000" />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#DEDEDE",
    padding: 20,
    borderRadius: 0,
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    padding: 20,
    paddingBottom: 5,
    fontWeight: "bold",
    marginTop: 10,
    color: "black",
  },
  subText: {
    fontSize: 14,
    padding: 20,
    paddingTop: 0,
    color: "#333",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  jobSection: {
    padding: 20,
  },
  noJobs: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
  jobCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 20,
    borderWidth: 1,
    backgroundColor: "#d9d9d9",
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 20,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  companyName: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  jobBottom: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  location: {
    fontSize: 14,
    color: "#444",
  },
  redirectButton: {
    padding: 8,
  },
});

export default JobPostings;
