#!/usr/bin/perl
#not getting response

# use strict;
# use warnings;
# use LWP::UserAgent;

# # Create a user agent object
# my $ua = LWP::UserAgent->new;

# # Specify the API URL
# my $url = 'https://rickandmortyapi.com/api/character/2';

# # Make the HTTP GET request
# my $response = $ua->get($url);

# # Check if the request was successful
# if ($response->is_success) {
# # Print the response content
# print $response->content;
# } else {
# # Print the error message
# die "Request failed: " . $response->status_line;
# }

#getting api response

# use strict;
# use warnings;
# use LWP::UserAgent;
# use IO::Socket::SSL;

# # Create a user agent object
# my $ua = LWP::UserAgent->new(
# ssl_opts => {
# SSL_verify_mode => IO::Socket::SSL::SSL_VERIFY_NONE,
# verify_hostname => 0,
# }
# );

# # Specify the API URL
# my $url = 'https://rickandmortyapi.com/api/character/2';

# # Make the HTTP GET request
# my $response = $ua->get($url);

# # Check if the request was successful
# if ($response->is_success) {
# # Print the response content
# print $response->content;
# } else {
# # Print the error message
# die "Request failed: " . $response->status_line;
# }

# use strict;
# use warnings;
# use LWP::UserAgent;
# use IO::Socket::SSL;
# use lib 'C:\Users\shivendu_parashar\Documents\API_Monitoring_2';
# use DBConnect;
# my $dbh=DBConnect::connect_db();
# my ($URL_STATUS,$RESPONSE_TIME);

# # Create a user agent object
# my $ua = LWP::UserAgent->new(
# ssl_opts => {
# SSL_verify_mode => IO::Socket::SSL::SSL_VERIFY_NONE,
# verify_hostname => 0,
# });

# # getting api id and valid. id against latest schedular id
# my $sth = $dbh->prepare("SELECT API_ID,VALIDATION_ID FROM ADDAPI_SCHEDULAR WHERE 
#     SCHEDULAR_ID IN (SELECT MAX(SCHEDULAR_ID) FROM ADDAPI_SCHEDULAR)");
# $sth->execute() or die $dbh->errstr;
# my ($API_ID,$VALIDATION_ID) = $sth->fetchrow_array;
# $sth->finish();

# # print "$API_ID,$VALIDATION_ID\n";

# # getting api url against latest url id
# my $sth_select_url = $dbh->prepare("SELECT API_URL FROM ADDAPI_URL WHERE URL_ID IN (SELECT MAX(URL_ID) FROM ADDAPI_URL WHERE API_ID = ?)");
# $sth_select_url->execute($API_ID) or die $dbh->errstr;
# my ($url) = $sth_select_url->fetchrow_array;
# $sth_select_url->finish();

# # print "$url\n";

# #get corresponding url id
# my $sth_urlid = $dbh->prepare("SELECT MAX(URL_ID) FROM ADDAPI_URL WHERE API_ID = ?");
# $sth_urlid->execute($API_ID) or die $dbh->errstr;
# my ($URL_ID) = $sth_urlid->fetchrow_array;
# $sth_urlid->finish();

# #get target id and name against VALIDATION_ID
# my $sth_parameters = $dbh->prepare("SELECT COMPARISON_ID, COMPARISION_NAME FROM ADDAPI_VALIDATION WHERE VALIDATION_ID = ?");  
# $sth_parameters->execute($VALIDATION_ID) or die $DBI::errstr;  
# my ($COMPARISON_ID,$COMPARISION_NAME) = $sth_parameters->fetchrow_array;
# $sth_parameters->finish();

# # Make the HTTP GET request
# my $response = $ua->get($url);

# # Check if the request was successful
# if ($response->is_success) {
# # Extract id and name using regular expressions
# my ($id) = $response->content =~ /"id":\s*(\d+)/;
# my ($name) = $response->content =~ /"name":\s*"([^"]+)"/;

# # # Print the extracted values
# # print "ID: $id\n";
# # print "Name: $name\n";

# if($id eq $COMPARISON_ID && $name eq $COMPARISION_NAME)
# {
#     $URL_STATUS = 1;
#     $RESPONSE_TIME = 2.3;
#     DBConnect::insert_api_status($URL_ID,$URL_STATUS,$RESPONSE_TIME,$API_ID);
#     print " Row inserted to status table successfully.";
# }
# else{
#     $URL_STATUS = 0;
#     $RESPONSE_TIME = 2.3;
#     DBConnect::insert_api_status($URL_ID,$URL_STATUS,$RESPONSE_TIME,$API_ID);
#     print " Row inserted to status table successfully.";
# }
# } else {
# # Print the error message
# die "Request failed: " . $response->status_line;
# }

use strict;
use warnings;
use LWP::UserAgent;
use IO::Socket::SSL;
use lib 'C:\Users\shivendu_parashar\Documents\API_Monitoring_2';
use SubRoutine;
use Time::HiRes qw(gettimeofday tv_interval);

my $dbh = SubRoutine::connect_db();
my ($URL_STATUS, $RESPONSE_TIME);

# Create a user agent object
my $ua = LWP::UserAgent->new(
ssl_opts => {
SSL_verify_mode => IO::Socket::SSL::SSL_VERIFY_NONE,
verify_hostname => 0,
}
);

while(1){

# Getting API ID and validation ID against the latest scheduler ID
my $sth = $dbh->prepare("SELECT API_ID, VALIDATION_ID,SCHEDULAR_TIME FROM ADDAPI_SCHEDULAR ORDER BY SCHEDULAR_TIME");
$sth->execute() or die $dbh->errstr;
while(my @row = $sth->fetchrow_array()){
my ($API_ID, $VALIDATION_ID,$SCHEDULAR_TIME) = @row;

sleep($SCHEDULAR_TIME*60);

# Getting API URL against the latest URL ID
my $sth_select_url = $dbh->prepare("SELECT API_URL FROM ADDAPI_URL WHERE URL_ID IN (SELECT MAX(URL_ID) FROM ADDAPI_URL WHERE API_ID = ?)");
$sth_select_url->execute($API_ID) or die $dbh->errstr;
my ($url) = $sth_select_url->fetchrow_array;
$sth_select_url->finish();

print "$url\n";

# Get corresponding URL ID
my $sth_urlid = $dbh->prepare("SELECT MAX(URL_ID) FROM ADDAPI_URL WHERE API_ID = ?");
$sth_urlid->execute($API_ID) or die $dbh->errstr;
my ($URL_ID) = $sth_urlid->fetchrow_array;
$sth_urlid->finish();

# Get target ID and name against VALIDATION_ID
my $sth_parameters = $dbh->prepare("SELECT COMPARISON_ID, COMPARISION_NAME FROM ADDAPI_VALIDATION WHERE VALIDATION_ID = ?");
$sth_parameters->execute($VALIDATION_ID) or die $DBI::errstr;
my ($COMPARISON_ID, $COMPARISON_NAME) = $sth_parameters->fetchrow_array;
$sth_parameters->finish();

# Make the HTTP GET request
my $start_time = [gettimeofday];
my $response = $ua->get($url);
my $end_time = [gettimeofday];

# Calculate the response time
my $elapsed = tv_interval($start_time, $end_time);
my $response_time = sprintf("%.3f", $elapsed); # Round to 3 decimal places

# Check if the request was successful
if ($response->is_success) {
# Extract id and name using regular expressions
my ($id) = $response->content =~ /"id":\s*(\d+)/;
my ($name) = $response->content =~ /"name":\s*"([^"]+)"/;

# Print the extracted values
print "ID: $id\n";
print "Name: $name\n";

if ($id eq $COMPARISON_ID && $name eq $COMPARISON_NAME) {
    $URL_STATUS = 1;
    $RESPONSE_TIME = $response_time;
    SubRoutine::insert_api_status($URL_ID, $URL_STATUS, $RESPONSE_TIME, $API_ID);
    print " Row inserted to status table successfully.\n";
} else {
    $URL_STATUS = 0;
    $RESPONSE_TIME = $response_time;
    SubRoutine::insert_api_status($URL_ID, $URL_STATUS, $RESPONSE_TIME, $API_ID);
    print " Row inserted to status table successfully.\n";
}
} else {
# Print the error message
die "Request failed: " . $response->status_line;
}
}
$sth->finish();
}