interface QueryResult {
  intent: {
    type: string;
    entity?: string;
    filters?: Record<string, any>;
    parameters?: Record<string, any>;
  };
  data?: any;
  error?: string;
}

class ResponseFormatter {
  // Format query results into natural language responses
  formatResponse(question: string, results: QueryResult[]): string {
    let response = '';

    for (const result of results) {
      if (result.error) {
        response += `❌ Error: ${result.error}\n\n`;
        continue;
      }

      switch (result.intent.type) {
        case 'today_schedule':
          response += this.formatTodaySchedule(result.data);
          break;
        case 'patient_lookup':
          response += this.formatPatientLookup(result.data, result.intent.filters);
          break;
        case 'patient_history':
          response += this.formatPatientHistory(result.data);
          break;
        case 'service_analysis':
          response += this.formatServiceAnalysis(result.data);
          break;
        case 'location_info':
          response += this.formatLocationInfo(result.data);
          break;
        case 'general_stats':
          response += this.formatGeneralStats(result.data);
          break;
        default:
          response += this.formatDefaultResponse(result.data);
      }
    }

    return response.trim();
  }

  private formatTodaySchedule(data: any): string {
    if (!data?.appointmentBookings || data.appointmentBookings.length === 0) {
      return "📅 **Today's Schedule:**\n\nNo appointments scheduled for today.\n\n";
    }

    let response = "📅 **Today's Schedule:**\n\n";
    
    data.appointmentBookings.forEach((apt: any, index: number) => {
      const patient = apt.appointment?.patient?.person;
      const patientName = patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
      const time = apt.localStartTime || 'Time TBD';
      
      response += `${index + 1}. **${patientName}** - ${time}\n`;
    });

    response += `\n**Total appointments today:** ${data.appointmentBookings.length}\n\n`;
    return response;
  }

  private formatPatientLookup(data: any, filters?: Record<string, any>): string {
    if (!data?.patients || data.patients.length === 0) {
      const patientName = filters?.patientName;
      return patientName 
        ? `👤 **Patient Search:**\n\nNo patients found matching "${patientName}".\n\n`
        : `👤 **Patient List:**\n\nNo patients found.\n\n`;
    }

    const patientName = filters?.patientName;
    let response = patientName 
      ? `👤 **Patient Search Results for "${patientName}":**\n\n`
      : `👤 **Recent Patients:**\n\n`;

    data.patients.forEach((patient: any, index: number) => {
      const name = patient.person ? `${patient.person.firstName} ${patient.person.lastName}` : 'Unknown';
      const createdDate = patient.createdAt ? new Date(patient.createdAt).toLocaleDateString() : 'Unknown date';
      
      response += `${index + 1}. **${name}** (Patient ID: ${patient.id})\n`;
      response += `   - Created: ${createdDate}\n`;
    });

    response += `\n**Total patients shown:** ${data.patients.length}\n\n`;
    return response;
  }

  private formatPatientHistory(data: any): string {
    if (!data?.appointmentBookings || data.appointmentBookings.length === 0) {
      return "📋 **Patient History:**\n\nNo appointment history found.\n\n";
    }

    let response = "📋 **Recent Appointment History:**\n\n";
    
    // Group by patient for better organization
    const patientAppointments = new Map();
    
    data.appointmentBookings.forEach((apt: any) => {
      const patient = apt.appointment?.patient?.person;
      const patientName = patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
      
      if (!patientAppointments.has(patientName)) {
        patientAppointments.set(patientName, []);
      }
      
      patientAppointments.get(patientName).push({
        date: apt.localStartDate,
        time: apt.localStartTime
      });
    });

    patientAppointments.forEach((appointments, patientName) => {
      response += `**${patientName}:**\n`;
      appointments.slice(0, 3).forEach((apt: any) => {
        response += `  - ${apt.date} at ${apt.time}\n`;
      });
      if (appointments.length > 3) {
        response += `  - ... and ${appointments.length - 3} more appointments\n`;
      }
      response += '\n';
    });

    response += `**Total appointments:** ${data.appointmentBookings.length}\n\n`;
    return response;
  }

  private formatServiceAnalysis(data: any): string {
    if (!data?.appointmentTypes || data.appointmentTypes.length === 0) {
      return "🩺 **Services Offered:**\n\nNo services found.\n\n";
    }

    let response = "🩺 **Services Offered:**\n\n";
    
    data.appointmentTypes.forEach((service: any, index: number) => {
      response += `${index + 1}. ${service.name}\n`;
    });

    response += `\n**Total services:** ${data.appointmentTypes.length}\n\n`;
    return response;
  }

  private formatLocationInfo(data: any): string {
    if (!data?.locations || data.locations.length === 0) {
      return "📍 **Practice Locations:**\n\nNo locations found.\n\n";
    }

    let response = "📍 **Practice Locations:**\n\n";
    
    data.locations.forEach((location: any, index: number) => {
      const city = location.address?.city || 'Unknown';
      const state = location.address?.state || 'Unknown';
      
      response += `${index + 1}. **${location.name}**\n`;
      response += `   - ${city}, ${state}\n`;
    });

    response += `\n**Total locations:** ${data.locations.length}\n\n`;
    return response;
  }

  private formatGeneralStats(data: any): string {
    const stats = {
      patients: data?.patients_aggregate?.aggregate?.count || 0,
      appointments: data?.appointmentBookings_aggregate?.aggregate?.count || 0,
      services: data?.appointmentTypes_aggregate?.aggregate?.count || 0,
      locations: data?.locations_aggregate?.aggregate?.count || 0
    };

    let response = "📊 **Practice Overview:**\n\n";
    response += `👥 **Total Patients:** ${stats.patients.toLocaleString()}\n`;
    response += `📅 **Total Appointments:** ${stats.appointments.toLocaleString()}\n`;
    response += `🩺 **Services Offered:** ${stats.services}\n`;
    response += `📍 **Practice Locations:** ${stats.locations}\n\n`;

    if (stats.patients > 0 && stats.appointments > 0) {
      const avgAppointmentsPerPatient = (stats.appointments / stats.patients).toFixed(1);
      response += `📈 **Average appointments per patient:** ${avgAppointmentsPerPatient}\n\n`;
    }

    return response;
  }

  private formatDefaultResponse(data: any): string {
    return "📋 **Information:**\n\nData retrieved successfully. Please ask a more specific question for detailed information.\n\n";
  }
}

export { ResponseFormatter };
